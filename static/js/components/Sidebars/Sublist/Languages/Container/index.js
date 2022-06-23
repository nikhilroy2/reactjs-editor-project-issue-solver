import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import LanguageSortableElement from '../Element';

const LanguagesSortableContainer = SortableContainer(({ items }) => (
  <div className="editor-sidebar__languages-list">
    {items.map((value, index) => (
      <LanguageSortableElement
        key={`item-${index}`}
        index={index}
        itemIndex={index}
        value={value}
      />
    ))}
  </div>
));

LanguagesSortableContainer.propTypes = {

};

export default LanguagesSortableContainer;
