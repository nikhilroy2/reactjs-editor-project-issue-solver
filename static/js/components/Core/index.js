import React, { useEffect, useRef } from 'react';
import './core.scss';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/widgets/draggable';
import classNames from 'classnames';

import { dataAdd } from '../../redux/actions/data/add';
import { dataSortable } from '../../redux/actions/data/sortable';
import '../../utils/Traverse';

import Recursion from './Recursion/Recursion';
import Translation from './Translation';

import Loader from './Loader';

import Methods from '../../utils/Methods/index';

import BlockActions from './BlockActions';
import Snippets from './Snippets';
import { getPageMinHeight } from './helper';

/**
 * Основной компонент, структура от (layouts.twig)
 *
 * @component
 * @category Core
 * @subcategory Core main
 *
 */
const Core = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.data, shallowEqual);
  const sidebar = useSelector((state) => state.sidebar.data);
  const isLoading = useSelector((state) => state.data.isLoading, shallowEqual);
  const publish = useSelector((state) => state.publish, shallowEqual);
  const configuration = useSelector((state) => state.configuration, shallowEqual);
  const { activePage } = useSelector((state) => state.pages, shallowEqual);

  const sortablePage = useRef(null);
  const sortableHeader = useRef(null);
  const sortableFooter = useRef(null);
  const sortableNavbar = useRef(null);

  const sortableArray = [
    {
      snippet: 'page',
      node: sortablePage,
    },
    {
      snippet: 'header',
      node: sortableHeader,
    },
    {
      snippet: 'footer',
      node: sortableFooter,
    },
    {
      snippet: 'navbar',
      node: sortableNavbar,
    },
  ];

  const initSortable = () => {
    sortableArray.forEach((item) => {
      const sortNode = $(item.node.current);
      sortNode.sortable({
        handle: `.editor__block-handle-sortable-${item.snippet}`,
        placeholder: 'animated pulse faster sortable-placeholder',
        cursorAt: { left: 5, top: 5 },
        helper(e) {
          const { title } = e.target.dataset;
          const { id } = e.target.dataset;
          return $(`<div class="editor__sortable-helper" data-block-id="${id}">${title}</div>`);
        },
        start: (e, ui) => {
          ui.item.indexAtStart = ui.item.index();
        },
        // eslint-disable-next-line
        stop: (e, ui) => {
          const indexStart = ui.item.indexAtStart;
          const indexStop = ui.item.index();
          sortNode.sortable('cancel');
          const position = ui.item[0].getAttribute('data-position');

          if (position && indexStart === indexStop) {
            return false;
          }

          if (position) {
            dispatch(dataSortable(indexStart, indexStop, item.snippet));
          } else {
            ui.item.remove();
            const newPosition = indexStop + 1;
            const navbarID = ui.item[0].getAttribute('data-block-id-navbar');
            const headerID = ui.item[0].getAttribute('data-block-id-header');
            const pageID = ui.item[0].getAttribute('data-block-id-page');
            const footerID = ui.item[0].getAttribute('data-block-id-footer');
            const getBlockID = () => {
              switch (item.snippet) {
                case 'navbar':
                  return navbarID;
                case 'header':
                  return headerID;
                case 'page':
                  return pageID;
                case 'footer':
                  return footerID;
                default:
                  return false;
              }
            };
            const blockID = getBlockID();
            if (blockID) {
              dispatch(dataAdd(blockID, newPosition, item.snippet));
            }
            ui.item.remove();
          }
        },
      });
    });
  };

  const navbar = Methods.sortableData(data.blocks.navbar);
  const page = Methods.sortableData(data.blocks.page);
  const header = Methods.sortableData(data.blocks.header);
  const footer = Methods.sortableData(data.blocks.footer);
  const isPublicPage = activePage && activePage.public;

  const isOpenSidebarBlocks = sidebar && sidebar === 'blocks';

  useEffect(() => {
    initSortable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading || publish.isLoading ? <Loader /> : null}
      <Translation />
      <div
        className={classNames('wrapper body', {
          'wrapper-sidebar editor-wrapper-sidebar': !!(navbar && navbar[0].settings.type === 'sidebar'),
          'wrapper-sidebar-navbar editor-wrapper-sidebar-navbar': !!(
            navbar && navbar[0].settings.type === 'navbar_sidebar'
          ),
          'wrapper-navbar editor-wrapper-navbar': !!(navbar && navbar[0].settings.type === 'navbar'),
          'editor-disable-block-hovers': isOpenSidebarBlocks,
          'body-rtl': configuration.rtl,
        })}
      >
        {navbar ? (
          <>
            {navbar.map((item, index) => {
              const blocksClasses = item.settings && item.settings.blockClasses ? item.settings.blockClasses : false;
              return (
                <div
                  id={`block_${item.id}`}
                  key={item.id}
                  className={classNames(`editor__block-navbar-wrapper ${blocksClasses || ''}`)}
                >
                  <BlockActions
                    dataID={item.id}
                    snippet="navbar"
                    blockID={item.block_id}
                    blockIndex={index}
                    position={item.position}
                    title={item.title}
                    settings={item.settings}
                  />
                  <Recursion
                    position={item.position}
                    values={item.data}
                    deps={item.deps}
                    domElement={item.template}
                    dataID={item.id}
                    blockID={item.block_id}
                    uniqueKey={`${item.id}.${index}`}
                  />
                </div>
              );
            })}
          </>
        ) : (
          <div className="editor-wrapper-snippet">
            {isOpenSidebarBlocks ? <Snippets title="Navigation" type="header" /> : null}
            <div
              className={classNames('editor-wrapper-content-navbar', {
                'editor-wrapper-content-navbar-empty': !header,
                'editor__empty-snippet-height': isOpenSidebarBlocks && !navbar,
              })}
              id="editor-wrapper-content-navbar"
              ref={sortableNavbar}
            />
          </div>
        )}
        <div
          className="wrapper-content editor-wrapper-content"
          style={{
            minHeight: getPageMinHeight(isOpenSidebarBlocks),
          }}
        >
          <div className="wrapper-content__body editor-wrapper-snippet">
            {isOpenSidebarBlocks ? <Snippets title="Page" type="page" /> : null}
            <div
              className={classNames('editor-wrapper-content-page', {
                'editor-wrapper-content-page-empty': !page,
                'editor-wrapper-content-page-height': isOpenSidebarBlocks && !page,
              })}
              style={{
                minHeight: getPageMinHeight(isOpenSidebarBlocks),
              }}
              id="editor-wrapper-content-page"
              ref={sortablePage}
            >
              {page ? (
                <>
                  {page.map((item, index) => {
                    const { settings } = item;
                    const BlockPreloader = Methods.getEmptyState(settings, item.id);
                    return (
                      (
                        <div
                          className="editor__block-wrapper"
                          key={item.id}
                          data-position={item.position}
                          data-block-id={item.id}
                          data-block-title={item.title}
                        >
                          <BlockActions
                            dataID={item.id}
                            snippet="page"
                            blockID={item.block_id}
                            blockIndex={index}
                            position={item.position}
                            title={item.title}
                            settings={item.settings}
                          />
                          <div id={`block_${BlockPreloader ? `${item.id}_empty` : item.id}`} className="editor__block-body">
                            {BlockPreloader ? <BlockPreloader />
                              : (
                                <Recursion
                                  position={item.position}
                                  values={item.data}
                                  deps={item.deps}
                                  domElement={item.template}
                                  dataID={item.id}
                                  blockID={item.block_id}
                                  uniqueKey={`${item.id}.${index}`}
                                />
                              ) }
                          </div>
                        </div>
                      )
                    )
                  })}
                </>
              ) : null}
            </div>
          </div>

          <div className="wrapper-content__footer editor-wrapper-snippet">
            {isOpenSidebarBlocks && isPublicPage ? <Snippets title="Footer" type="footer" /> : null}
            <div
              className={classNames('editor-wrapper-content-footer', {
                'editor-wrapper-content-footer-empty': !footer && isPublicPage,
                'editor__empty-snippet-height': isOpenSidebarBlocks && !footer && isPublicPage,
              })}
              ref={sortableFooter}
              id="editor-wrapper-content-footer"
            >
              {footer ? (
                <>
                  {footer.map((item, index) => (
                    <div
                      className="editor__block-wrapper"
                      key={item.id}
                      data-position={item.position}
                      data-block-id={item.id}
                      data-block-title={item.title}
                    >
                      <BlockActions
                        dataID={item.id}
                        snippet="footer"
                        blockID={item.block_id}
                        blockIndex={index}
                        position={item.position}
                        title={item.title}
                        settings={item.settings}
                      />
                      <div id={`block_${item.id}`}>
                        <Recursion
                          position={item.position}
                          values={item.data}
                          deps={item.deps}
                          domElement={item.template}
                          dataID={item.id}
                          blockID={item.block_id}
                          uniqueKey={`${item.id}.${index}`}
                        />
                      </div>
                    </div>
                  ))}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Core;
