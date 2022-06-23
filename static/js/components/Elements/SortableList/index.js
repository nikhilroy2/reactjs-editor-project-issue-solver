import React from 'react';
import PropTypes from 'prop-types';
import './_sortable_list.scss';
import _ from 'lodash';
import classNames from 'classnames';
import { SortableContainer, SortableElement, sortableHandle } from 'react-sortable-hoc';
import { ReactComponent as Delete } from '../../../assets/img/delete.svg';
import { ReactComponent as Settings } from '../../../assets/img/actions/settings.svg';
import { ReactComponent as Dots } from '../../../assets/img/dots.svg';
import { ReactComponent as TotalsVisibility } from '../../../assets/img/totals_visibility.svg';
import Tooltip from '../Tooltip';

const SortableList = ({
  list, onSort, onDelete, onSettings, onChangeVisibility,
}) => {
  const DragHandle = sortableHandle(() => (
    <div className="editor__sortable-list-handle">
      <Tooltip text="Drag and Drop">
        <Dots />
      </Tooltip>
    </div>
  ));
  const SortableItem = SortableElement(({ value, itemIndex }) => (
    <div
      className={classNames('editor__sortable-list-item', {
        'editor__sortable-list-item-disabled': !_.isUndefined(value.visibility) && !value.visibility,
      })}
      style={{ zIndex: 9999999999 }}
    >
      <DragHandle />
      {value.icon
        ? (
          <div className={classNames('editor__sortable-list-icon', {
            'editor__sortable-list-icon-disabled': !value.icon_visibility,
          })}
          >
            <span className={value.icon} />
          </div>
        ) : null}
      {value.name}
      {onDelete ? (
        <div className="editor__sortable-list-delete" onClick={() => onDelete(itemIndex)}>
          <Tooltip text="Delete">
            <Delete />
          </Tooltip>
        </div>
      ) : null}
      {onSettings ? (
        <div className="editor__sortable-list-settings" onClick={() => onSettings(value)}>
          <Tooltip text="Change settings">
            <Settings />
          </Tooltip>
        </div>
      ) : null}
      {value.show_visible ? (
        <div className="editor__sortable-list-visible" onClick={() => onChangeVisibility(itemIndex)}>
          <Tooltip text={value.visibility ? 'Make hidden' : 'Make visible'}>
            <TotalsVisibility />
          </Tooltip>
        </div>
      ) : null}
    </div>
  ));

  const SortableList = SortableContainer(({ items }) => (
    <div className="editor__sortable-list animate-transition-03">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} itemIndex={index} value={value} />
      ))}
    </div>
  ));

  const onSortEnd = ({ oldIndex, newIndex }) => {
    onSort(oldIndex, newIndex);
  };

  if (list.length) {
    return <SortableList items={list} onSortEnd={onSortEnd} useDragHandle />;
  }

  return <div>List is empty</div>;
};

SortableList.defaultProps = {
  list: [
    {
      name: 'Item 1',
    },
  ],
};

SortableList.propTypes = {
  list: PropTypes.array,
  onSort: PropTypes.func,
  onDelete: PropTypes.func,
  onSettings: PropTypes.func,
  onChangeVisibility: PropTypes.func,
};

export default SortableList;
