import _ from 'lodash';

export const defaultBorders = (obj) => ({
  ...obj,
})

// const bordersRadius = {
//   first_side: 'top_left',
//   second_side: 'bottom_left',
//   third_side: 'top_right',
//   fourth_side: 'bottom_right',
// }

// const bordersWidth = {
//   first_side: 'top',
//   second_side: 'left',
//   third_side: 'bottom',
//   fourth_side: 'right',
// }

export const parsedBorder = (value, id, borders) => {
  switch (id) {
    case 1: {
      return {
        ...defaultBorders(borders),
        first_side: value,
        second_side: value,
        third_side: value,
        fourth_side: value,
      }
    }
    case 2: {
      return {
        ...defaultBorders(borders),
        first_side: value,
      }
    }
    case 3: {
      return {
        ...defaultBorders(borders),
        second_side: value,
      }
    }
    case 4: {
      return {
        ...defaultBorders(borders),
        third_side: value,
      }
    }
    case 5: {
      return {
        ...defaultBorders(borders),
        fourth_side: value,
      }
    }
    default: {
      return defaultBorders(borders)
    }
  }
}

export const intParsedObj = (obj) => {
  const newObj = {}
  // eslint-disable-next-line
  for (const prop in obj) {
    newObj[prop] = parseInt(obj[prop], 10);
  }
  return newObj
}

export const getActiveSide = (obj) => {
  let active;
  const objKeys = Object.keys(obj);
  const fieldEqual = objKeys.every((v) => obj[v] === obj[objKeys[0]])
  if (fieldEqual) {
    active = 1;
  } else {
    for (const prop in obj) {
      if (obj[prop] > 0) {
        // eslint-disable-next-line
        return active = objKeys.indexOf(prop) + 2
      }
    }
  }
  return active
}

export const parsedObj = (obj) => {
  // const radius = type === 'radius';
  const object = Object.entries(obj).map((item) => {
    const newItem = [...item];
    newItem[1] += 'px';
    return newItem
  });
  const newObj = Object.fromEntries(object);
  // let mappedObj = Object.keys(newObj).reduce((acc, key) => {
  //   acc[radius ? bordersRadius[key] : bordersWidth[key]] = newObj[key];
  //   return acc;
  // }, {});
  return newObj
}

export const getResult = (borders, isActive) => {
  let result;
  const bordersArr = Object.values(borders);
  const findResult = bordersArr.filter((item, index) => index === (isActive - 2));
  if (!_.isEmpty(findResult)) {
    result = findResult[0]
  } else {
    result = Math.max.apply(null, bordersArr);
  }
  return result;
}
