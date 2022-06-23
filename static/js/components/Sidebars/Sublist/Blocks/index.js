import React, { useEffect, useRef, useState } from 'react';
import './_sidebars_blocks.scss';
import './_draggable.scss';
import { useSelector } from 'react-redux';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import FlipMove from 'react-flip-move';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { filteredBlocks, getOptions, getDraggableClasses } from './helpers';
import { ReactComponent as IconLock } from '../../../../assets/img/actions/lock.svg';
import { dragSnippets } from './contants';
import { Sidebar, SidebarBody } from '../../../../layouts/Sidebar';

import NewSelect from '../../../Elements/Select';
import Tooltip from '../../../Elements/Tooltip';

const SidebarBlocks = ({ onClose }) => {
  const node = useRef(null);
  const blocks = useSelector((state) => state.blocks.data);
  const { rtl, is_demo } = useSelector((state) => state.configuration);
  const { blocks: page_blocks } = useSelector((state) => state.data);
  const pageBlocksJSON = JSON.stringify(page_blocks);
  const [filter, setFilter] = useState('all');

  const outSideClick = (e) => {
    const menuNode = document.getElementById('editor__sidebar-menu-item-blocks');
    if (menuNode && menuNode.contains(e.target)) {
      return false;
    }
    if (node.current && node.current.contains(e.target)) {
      return false;
    }
    return onClose(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', outSideClick, false);

    dragSnippets.forEach((item) => {
      const node = $(item.node);
      if (node.length) {
        node.draggable({
          connectToSortable: item.connectToSortable,
          helper(e) {
            const { title } = e.target.dataset;
            const ids = JSON.parse(e.target.dataset.ids);

            return $(
              `<div class="editor__draggable-helper" ${ids.navbar ? `data-block-id-navbar="${ids.navbar}"` : ''} ${
                ids.header ? `data-block-id-header="${ids.header}"` : ''
              } ${ids.page ? `data-block-id-page="${ids.page}"` : ''} ${ids.footer ? `data-block-id-footer="${ids.footer}"` : ''}>${title}</div>`,
            );
          },
          cursorAt: { left: 5, top: 5 },
          stop: () => {
            onClose(false);
          },
        });
      }
    });

    return () => {
      document.removeEventListener('mousedown', outSideClick, false);
    };
  });

  const filterBlocks = filteredBlocks(blocks, filter);
  const blockOptions = getOptions(blocks);

  return (
    <Sidebar ref={node}>
      <SidebarBody>
        <div className="editor__sidebar-blocks scrollbar-light">
          <div className="editor__sidebar-blocks-header">
            <NewSelect
              options={blockOptions}
              handleChangeSelect={(value) => setFilter(value.value)}
              activeValue={blockOptions.find((o) => o.value === filter)}
              isSearchable
            />
          </div>
          <div className="editor__sidebar-blocks-body">
            <div className="editor__sidebar-blocks-list">
              <FlipMove duration={300} easing="ease-out" className="editor__sidebar-blocks-list-flip">
                {filterBlocks.map((item) => {
                  const isPreview = item.preview_ltl || item.preview_rtl;
                  const dragClass = getDraggableClasses(item.snippet);
                  const dataProps = {
                    'data-ids': JSON.stringify(item.ids),
                    'data-title': item.title,
                  };
                  const checkBlockOnPage = pageBlocksJSON.indexOf(`"title":"${item.title}"`) > -1;
                  const uniqueOnPage = parseInt(item.unique_on_page, 10);
                  let isDisabled = uniqueOnPage === 2 || uniqueOnPage === 3;

                  if (is_demo === 1) {
                    isDisabled = checkBlockOnPage && (uniqueOnPage === 2 || uniqueOnPage === 3);

                    if ((item.title === 'New order with text' || item.title === 'New order') && pageBlocksJSON.includes('"title":"New order')) {
                      isDisabled = true;
                    }
                  }

                  return (
                    <div
                      className={classNames('editor__sidebar-blocks-item', {
                        'editor__sidebar-blocks-item-disabled': isDisabled,
                        'editor__sidebar-blocks-item-empty': !isPreview,
                        [dragClass]: !isDisabled,
                      })}
                      key={`block_id_${item.id}`}
                      {...dataProps}
                    >
                      {isDisabled ? (
                        <div className="editor__sidebar-blocks-item-disabled-icon">
                          {uniqueOnPage === 3 ? (
                            <Tooltip
                              text="There can be only one block on a page. Delete current block to add new"
                              placement="RIGHT_CENTER"
                              type="error"
                            >
                              <div className="editor__sidebar-blocks-item-disabled-tooltip">
                                <IconLock />
                              </div>
                            </Tooltip>
                          ) : (
                            <div className="editor__sidebar-blocks-item-disabled-tooltip">
                              <IconLock />
                            </div>
                          )}
                        </div>
                      ) : null}
                      {isPreview ? (
                        <img
                          src={rtl ? item.preview_rtl : item.preview_ltl}
                          className="editor__sidebar-blocks-item-image animate-transition-03"
                          {...dataProps}
                          alt={`block_id_${item.id}`}
                        />
                      ) : null}
                    </div>
                  );
                })}
              </FlipMove>
            </div>
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

SidebarBlocks.defaultProps = {
  onClose: (obj) => console.log(obj),
};

SidebarBlocks.propTypes = {
  onClose: PropTypes.func,
};

export default SidebarBlocks;
