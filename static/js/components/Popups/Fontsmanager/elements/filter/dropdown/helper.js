export const getFirstWord = (str) => {
  const spaceIndex = str.indexOf(' ');
  return spaceIndex === -1 ? str : str.substr(0, spaceIndex);
};
