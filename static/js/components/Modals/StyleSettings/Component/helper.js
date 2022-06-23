export const getComponent = (data, key) => {
  if (data && key) {
    if (data[key]) {
      return data[key];
    }
  }
  return false;
};
