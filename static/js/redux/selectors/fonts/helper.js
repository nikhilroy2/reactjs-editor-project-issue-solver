const upFirstLetter = (value) => value.charAt(0).toUpperCase() + value.slice(1)

export const parseLabelString = (value) => {
  const getNumber = parseInt(value, 10) ? String(parseInt(value, 10)) : '';
  const getString = value.slice(getNumber.length);
  const label = getString && getNumber
    ? `${upFirstLetter(getString)} ${getNumber}` : upFirstLetter(getString) || getNumber;
  return {
    label,
    weight: getNumber ? Number(getNumber) : false,
    style: getString || false,
  }
}
