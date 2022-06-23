import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import LanguagesItem from '../Item';

const LanguageSortableElement = SortableElement(({ value, itemIndex }) => (
  <LanguagesItem
    index={itemIndex}
    drag
    {...value}
  />
));

LanguageSortableElement.propTypes = {

};

export default LanguageSortableElement;
