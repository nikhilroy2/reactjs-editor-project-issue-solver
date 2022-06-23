import _ from 'lodash';

export const getStartValues = (weight, style, fontId, arr) => {
  let family;
  const newFamily = arr.find((item) => Number(item.id) === Number(fontId));

  if (newFamily) {
    family = newFamily;
  } else {
    family = arr[0];
  }

  const { variants } = arr.filter((item) => item === family)[0];

  let variant;
  if (weight || style) {
    const newWeight = weight || '';
    variant = variants.find((item) => {
      if (item.value === 'regular') {
        item.value = '400';
      }

      return `${item.value}` === `${newWeight}`;
    });

    variant = _.isEmpty(variant) ? variants[0] : variant;
  } else {
    variant = variants[0];
  }

  variants.map((variant) => {
    if (variant.label === 'Regular') {
      variant.label = 'Regular 400';
    }

    return variant;
  });

  return {
    family,
    variants,
    variant,
  };
};
