import _ from 'lodash';
import store from '../store';
import Methods from './Methods';

/**
 * @name getSourceValue
 * @function
 * @description получить значение из data (source)
 * @param {object} source - объект с типом, где брать значения
 * @param {number} dataID - id блока
 */
export const getSourceValue = (source, dataID) => {
  const {
    data, languages, components, configuration,
  } = store.getState();
  const { blocks } = data;

  const getData = () => {
    let data = false;
    Object.values(blocks).forEach((item) => {
      if (Object.keys(item).includes(`${dataID}`)) {
        data = item[dataID];
      }
    });
    return data;
  };

  if (source) {
    if (source.typeData && source.value) {
      const data = getData();
      if (data) {
        if (source.typeData === 'data') {
          return _.get(data.data, source.value, 'not found');
        }
        if (source.typeData === 'currencyData') {
          const getData = _.get(data.data, source.value, 'not found');
          if (getData !== 'not found') {
            return configuration?.currency_template?.replace('{{value}}', getData.replace('$', ''));
          }
          return 'not found';
        }
        if (source.typeData === 'deps') {
          return _.get(data.deps, source.value, 'not found');
        }
        if (source.typeData === 'currency') {
          return configuration?.currency_template?.replace('{{value}}', source.value) || 'not found';
        }
        if (source.typeData === 'languages') {
          if (languages.translations[source.value]) {
            return languages.translations[source.value];
          }
          return 'not found';
        }
        if (source.typeData === 'components') {
          return _.get(components.data, source.value, 'not found');
        }
      }
      return new Error('Not found: dataID')
    }

    return new Error('Not found: typeData or value')
  }

  return false;
};

/**
 * @name getObjectSource
 * @function
 * @description получить значение в объекте
 * @param {object} object - объект
 * @param {string} key - ключ значения
 */
export const getObjectSource = (object, key) => {
  if (key) {
    if (key === 'default') {
      return object;
    }
    return _.get(object, key, 'not found');
  }

  return false;
};

/**
 * @name getParentKey
 * @function
 * @description Пути где находятся значения для записи
 * @param {object} source - объект
 */
export const getParentKey = (source) => {
  const keys = {
    parentKey: false,
    currentKey: false,
    currentPath: false,
  };

  if (source) {
    if (source.typeData && source.value) {
      const regExp = /\[(.*?)\]/;
      const split = source.value.split('.');
      if (split.length === 1) {
        if (_.isNull(source.value.match(regExp))) {
          keys.parentKey = split[0];
          keys.currentKey = split[0];
          keys.currentPath = 'default';
        } else {
          keys.parentKey = split[0].replace(regExp, '');
          keys.currentKey = split[0].match(regExp)[1];
          keys.currentPath = 'default';
        }
      } else {
        keys.parentKey = split[0].replace(regExp, '');

        const lastItem = split[split.length - 1];
        const firstItem = split[0];

        if (_.isNull(lastItem.match(regExp))) {
          if (_.isNull(firstItem.match(regExp))) {
            // keys.currentPath = split.slice(split.length - 2, 1).join('.')
            keys.currentPath = _.dropRight(split).join('.')
          } else {
            const splitWithOutLastItem = _.cloneDeep(split);
            splitWithOutLastItem.pop();
            keys.currentPath = splitWithOutLastItem.join('.');
          }

          keys.currentKey = lastItem;
        } else {
          const currentPath = `${split.slice(split.length - 2, 1).join('.')}.${lastItem.replace(regExp, '')}`;

          if (_.isNull(firstItem.match(regExp))) {
            keys.currentPath = currentPath;
          } else {
            const splitFirstItem = currentPath.split('.').slice(1);
            keys.currentPath = `[${firstItem.match(regExp)[1]}].${splitFirstItem.join('.')}`;
          }

          keys.currentKey = lastItem.match(regExp)[1];
        }
      }
    }
  }

  return keys;
};

/**
 * @name getNewData
 * @function
 * @description получаем data из source
 * @param {object} source - объект
 * @param {number} dataID - id блока
 */
export const getNewData = (source, dataID) => {
  if (source && dataID) {
    if (source.hasOwnProperty('typeData')) {
      switch (source.typeData) {
        case 'deps':
          const deps = Methods.getDeps(dataID);
          if (deps) {
            return _.cloneDeep(deps);
          }
          break;
        default:
          const data = Methods.getData(dataID);
          if (data) {
            return _.cloneDeep(Methods.getData(dataID).data)
          }
      }
    }
  }
  return false;
};
