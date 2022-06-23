export const convertPosition = (currentX, currentY, revert) => {
  const x = 256; // 100%
  const y = 112; // 100%

  let positionX;
  let positionY;

  if (revert) {
    positionX = Math.min(Math.round((currentX / 100) * x), 100);
    positionY = Math.min(Math.round((currentY / 100) * y), 100);
  } else {
    positionX = Math.min(Math.round((100 * currentX) / x), 100);
    positionY = Math.min(Math.round((100 * currentY) / y), 100);
  }

  return {
    positionX,
    positionY,
  }
};
