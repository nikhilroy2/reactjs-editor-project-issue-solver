/* eslint-disable */
import _ from 'lodash';
import store from '../store';
import { getSourceValue } from './SourceValue';

const getValueConstant = (constant, dataID) => {
  if (constant === null) {
    return true;
  }
  if (_.isString(constant)) {
    return constant;
  }
  if (_.isObject(constant)) {
    if (constant.source) {
      const value = getSourceValue(constant.source, dataID);
      if (value !== 'not found') {
        return value;
      }
    }
  }

  return 'empty';
};

const switchResult = (value1, value2, operator) => {
  switch (operator) {
    case '==':
      if (value1 == value2) {
        return true;
      }
      break;
    case '===':
      if (value1 === value2) {
        return true;
      }
      break;
    case '>':
      if (value1 > value2) {
        return true;
      }
      break;
    case '>=':
      if (value1 >= value2) {
        return true;
      }
      break;
    case '<':
      if (value1 < value2) {
        return true;
      }
      break;
    case '<=':
      if (value1 <= value2) {
        return true;
      }
      break;
    case 'length':
      if (value1.length) {
        return true;
      }
      break;
    default:
      if (value1) {
        return true;
      } else return _.isBoolean(value1) && value1 === false;
  }
};

export default (item, dataID) => {
  if (item && dataID) {
    const page = store.getState().pages.activePage;

    if (item.constant1) {
      if (_.isString(item.constant1)) {
        if (item.constant1 === 'public') {
          if (page.public) {
            return item.statement;
          }
        }
      }

      if (item.operator === null && item.constant2 === null) {
        const value = getValueConstant(item.constant1, dataID);
        if (value) {
          return item.statement;
        } else {
          if (item.else) {
            return item.else;
          }
          return '0';
        }
      }

      if ((item.operator && item.constant2) || item.constant2 === null) {
        const value1 = getValueConstant(item.constant1, dataID);
        const value2 = getValueConstant(item.constant2, dataID);

        if (value1 !== 'empty' && value2 !== 'empty') {
          const result = switchResult(value1, value2, item.operator);
          if (result) {
            return item.statement;
          }
        }
      }
    }

    if (item.else) {
      return item.else;
    }
  }

  return '0';
};
