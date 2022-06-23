import _ from 'lodash';

export default (rootNode, popupNode, customOptions) => {
  const root = rootNode.current;
  const popup = popupNode.current;

  const options = {
    direction: customOptions && customOptions.direction ? customOptions.direction : 'right',
    margin: customOptions && customOptions.margin ? customOptions.margin : 55,
    scale: customOptions && customOptions.scale ? customOptions.scale : 1,
    position: customOptions && customOptions.position ? customOptions.position : false,
  };

  if (root && !_.isNull(root) && popup && !_.isNull(popup)) {
    const rootElementBounding = root.getBoundingClientRect();
    const popupElementBounding = popup.getBoundingClientRect();
    let top;
    let left;

    if (options.direction === 'right') {
      top = rootElementBounding.top + window.pageYOffset;
      left = rootElementBounding.right;
    }

    if (options.direction === 'left') {
      if (options.position) {
        top = -5;
      } else {
        top = rootElementBounding.top + window.pageYOffset - 5;
      }
      if (options.position) {
        left = `-${popupElementBounding.width * options.scale + 5}`;
      } else {
        left = rootElementBounding.left
          - (popupElementBounding.width + popupElementBounding.width * options.scale)
          - options.margin;
      }
    }

    if (options.direction === 'center bottom') {
      top = rootElementBounding.top + rootElementBounding.height + window.pageYOffset + options.margin;
      left = rootElementBounding.left + rootElementBounding.width / 2 - popupElementBounding.width / 2;
    }

    if (options.direction === 'right bottom') {
      top = rootElementBounding.top + rootElementBounding.height + window.pageYOffset + options.margin;
      left = rootElementBounding.right - popupElementBounding.width - options.margin;
    }

    if (options.direction === 'center top') {
      top = rootElementBounding.top + window.pageYOffset - popupElementBounding.height - options.margin;
      left = rootElementBounding.left + rootElementBounding.width / 2 - popupElementBounding.width / 2;
    }

    if (options.direction === 'bottom') {
      top = rootElementBounding.top + window.pageYOffset + rootElementBounding.height + options.margin;
      left = rootElementBounding.left;
    }

    if (options.direction === 'bottom right') {
      top = rootElementBounding.top + window.pageYOffset + rootElementBounding.height + options.margin;
      left = rootElementBounding.left - popupElementBounding.width + rootElementBounding.width;
    }
    if (options.direction === 'bottom left') {
      top = rootElementBounding.top + window.pageYOffset + rootElementBounding.height + options.margin;
      left = rootElementBounding.left;
    }

    if (options.direction === 'top') {
      top = rootElementBounding.top + window.pageYOffset - popupElementBounding.height - options.margin;
      left = rootElementBounding.left + rootElementBounding.width / 2 - popupElementBounding.width / 2;
    }

    if (options.direction === 'center center') {
      top = rootElementBounding.top
        + rootElementBounding.height / 2
        - popupElementBounding.height / 2
        + window.pageYOffset
        - options.margin;
      left = rootElementBounding.left + rootElementBounding.width + popupElementBounding.width / 2 - options.margin;

      if (top < 0) {
        top = 20;
      }
    }

    return {
      top: parseInt(top, 10),
      left: parseInt(left, 10),
    };
  }

  return false;
};
