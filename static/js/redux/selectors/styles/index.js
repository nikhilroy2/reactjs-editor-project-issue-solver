import { createSelector } from 'reselect';

const stylesSelector = (state) => state.styles;
export const mapStylesSelector = createSelector(
  [stylesSelector], (styles) => {
    const { data, isFetchingId } = styles;
    const activeStyle = data.find((item) => item.active)
    const otherStyles = data.filter((item) => !item.active)
    return {
      isFetchingId,
      activeStyle,
      otherStyles,
    }
  },
);
