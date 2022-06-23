import _ from 'lodash';
import { getSourceValue, getObjectSource } from '../../../utils/SourceValue';
import { convertEditorStateToHTML, convertFromRawToEditorState } from '../../Core/RichTextInline/helper';

const getName = (data, name, dataID) => {
  if (data && name && dataID) {
    const text = getObjectSource(data, name);
    if (text && text !== 'not found') {
      if (_.isObject(text)) {
        if (text.hasOwnProperty('data')) {
          let html = '';
          if (_.isString(text.data)) {
            html = text.data;
          } else if (_.isObject(text.data)) {
            const editorState = convertFromRawToEditorState(text.data);
            html = convertEditorStateToHTML(editorState);
          }
          const htmlStripTags = html.replace(/<[^>]*>?/gm, '');
          return htmlStripTags.length > 24 ? `${htmlStripTags.substring(0, 24)}...` : htmlStripTags;
        }
      } else if (_.isString(text)) {
        return text;
      } else {
        return 'Item';
      }
    }
  }

  return 'Item';
};

export const getList = (sortable, dataID) => {
  if (sortable && sortable.source) {
    const list = getSourceValue(sortable.source, dataID);
    const name = sortable.name ? sortable.name : false;
    if (list !== 'not found' && _.isArray(list)) {
      return list.map((item, index) => ({
        name: name ? getName(item, name, dataID) : `Item ${index + 1}`,
      }));
    }
  }
  return [];
};
