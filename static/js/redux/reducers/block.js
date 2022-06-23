const initialState = {
  tooltip: false,
  dropdown: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'OPEN_TOOLTIP':
      return {
        ...state,
        tooltip: payload,
      };
    case 'OPEN_DROPDOWN':
      return {
        ...state,
        dropdown: {
          ...state.dropdown,
          key: payload.key,
        },
      };
    default:
      return state;
  }
}
