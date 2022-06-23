/* eslint-disable */
export const findRotate = (string) => {
  const rotate = {
    x: false,
    y: false,
  };

  if (string.search(/rotateY\(([\d]+[a-z]+)\)/) != -1) {
    rotate.y = true;
  }

  if (string.search(/rotateX\(([\d]+[a-z]+)\)/) != -1) {
    rotate.x = true;
  }

  return rotate;
};

export const findSelectedDivider = (list, id) => {
  if (list && id) {
    try {
      const findIndex = list.findIndex((item) => {
        if (Number(item.id) === Number(id)) {
          return true;
        }
      });

      if (findIndex && findIndex !== -1) {
        if (list[findIndex].source) {
          return list[findIndex];
        }
        return false;
      }
      return false;
    } catch (error) {
      console.error(error.message);
    }
  }

  return new Error('Not found list, id');
};

export const getRepeat = (value) => {
  if (value) {
    try {
      const backgroundSizes = value.split(' ');
      if (backgroundSizes.length === 2) {
        return parseInt(backgroundSizes[0], 10);
      } else {
        return new Error(`Not valid background-size: ${value}`);
      }
    } catch (error) {}
  }
  return new Error('Not found value');
};
