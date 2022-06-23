import _ from 'lodash';

import store from '../../../../../store';

export const Methods = class Methods {
  static getAttrs(domElement, data) {
    const newAttrs = {};

    if (domElement && data) {
      const { attrs } = domElement;

      Object.keys(attrs).forEach((attribute) => {
        const attrsValue = attrs[attribute];

        if (domElement.tagName === 'a') {
          newAttrs.href = '#';
        }

        switch (attribute) {
          case 'className':
            if (_.isArray(attrsValue)) {
              let classString = '';
              attrsValue.forEach((item) => {
                classString = `${classString} ${item}`
              });
              newAttrs[attribute] = classString.trimStart();
            }
            break;
          default:
            newAttrs[attribute] = attrsValue;
            break;
        }
      })
    }

    return newAttrs;
  }

  static getSourceValue(domElement) {
    const { configuration } = store.getState();

    if (domElement?.text?.source?.value) {
      if (domElement.text.source.typeData === 'currency') {
        return configuration?.currency_template?.replace('{{value}}', domElement.text.source.value);
      }
    } if (domElement?.text) {
      return domElement.text;
    }

    return null;
  }
};
