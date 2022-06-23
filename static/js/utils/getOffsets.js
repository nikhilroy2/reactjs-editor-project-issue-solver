/**
 * @name tooltip
 * @function
 * @description возвращает position left, top тултипа
 * @param {object} toolBarBounds - Bounds тултипа
 * @param {object} selectRangeBounds - Bounds выделенного текста
 */
export const tooltip = (toolBarBounds, selectRangeBounds) => {
  const windowWidth = window && window.innerWidth ? window.innerWidth : 0;

  const getOffsetTop = (place) => {
    const margin = 2;
    if (place.top) {
      return selectRangeBounds.top + window.pageYOffset - toolBarBounds.height;
    }
    return selectRangeBounds.top + window.pageYOffset - toolBarBounds.height + toolBarBounds.height + selectRangeBounds.height + margin;
  };

  const getOffsetLeft = (place) => {
    const margin = 2;
    if (place.center) {
      return selectRangeBounds.left - (toolBarBounds.width - selectRangeBounds.width) / 2;
    } if (place.left) {
      return selectRangeBounds.left - toolBarBounds.width + selectRangeBounds.width - margin;
    }
    return margin;
  };

  const checkPlaceVertical = () => {
    if (selectRangeBounds.top >= toolBarBounds.height) {
      return {
        top: true,
        bottom: false,
      }
    }
    return {
      top: false,
      bottom: true,
    }
  };

  const checkPlaceHorizontal = () => {
    const toolbarWidth = toolBarBounds.width / 2;

    if (toolBarBounds.width < selectRangeBounds.width) {
      return {
        right: true,
        center: true,
        left: true,
      }
    }

    if (selectRangeBounds.left > ((toolBarBounds.width - selectRangeBounds.width) / 2) && (windowWidth - selectRangeBounds.right) > toolbarWidth) {
      return {
        right: true,
        center: true,
        left: true,
      }
    } if (selectRangeBounds.left > toolbarWidth) {
      return {
        right: false,
        center: false,
        left: true,
      }
    }
    return {
      right: true,
      center: false,
      left: false,
    }
  };

  const placeVertical = checkPlaceVertical();
  const placeHorizontal = checkPlaceHorizontal();
  const offSetLeft = getOffsetLeft(placeHorizontal);
  const offsetTop = getOffsetTop(placeVertical);

  return {
    left: offSetLeft,
    top: offsetTop,
  };
};
