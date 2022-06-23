export const onlyDigits = (string) => (string ? string.replace(/[^\d]/g, '') : '');

export const getSliderValue = (value, min, max) => {
  if (value <= min && value) {
    return min
  } if (value >= max) {
    return max
  }
  if (value === 0) {
    return 0
  }
  return value
};

export const pressEnter = (e, fn) => {
  if (e.key === 'Enter') {
    fn(e)
  }
};
