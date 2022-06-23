import _ from 'lodash';
import { getObjectSource } from './SourceValue';

export const insertBefore = (arr, index, newItem) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index),
];

export const scrollTo = (node) => {
  if (node) {
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: node.offsetTop,
    });
  }
  console.error('Not found node')
};

export const scrollToNewBlock = (dataID) => {
  if (dataID) {
    const block = document.getElementById(`block_${dataID}`);
    scrollTo(block);
  }
  return new Error('Not found dataID')
};

export const isValidParam = (param) => {
  if (_.isUndefined(param) || _.isNaN(param)) {
    return false
  }
  return true;
};

export const fitsOnScreen = (node) => {
  if (node) {
    const parties = {
      left: false,
      right: false,
      top: false,
      bottom: false,
    };

    const bounding = node.getBoundingClientRect();
    const { body } = document;
    const nodeWidth = bounding.width;
    const nodeHeight = bounding.height;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const bodyHeight = body.scrollHeight;

    const emptiness = windowWidth - nodeWidth;
    parties.right = bounding.left < emptiness;
    parties.left = bounding.right > emptiness;

    const emptinessBottom = bodyHeight - node.offsetTop;
    parties.bottom = windowHeight + 6 === bounding.top ? false : (emptinessBottom > nodeHeight);
    parties.top = node.offsetTop > nodeHeight;

    return parties;
  }
  return false;
};

/**
 * @name getLandingValues
 * @function
 * @description выводим дефолтные значения для предустановленных блоков темы
 * @param {object} componentsData - Компоненты стиля
 * @param {object} source - Актуальные данные
 * @param {string} dataID - ID блока
 */
export const getLandingValues = (componentsData, source, dataID) => {
  if (componentsData) {
    if (componentsData.landing && componentsData.landing.data) {
      const { data } = componentsData.landing;

      if (data[dataID]) {
        const landingValue = getObjectSource(data[dataID], source.value);
        if (landingValue !== 'not found') {
          return landingValue;
        }
      }
    }
  }
  return false;
};
