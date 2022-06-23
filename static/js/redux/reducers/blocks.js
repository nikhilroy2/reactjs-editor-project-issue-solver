import * as blocksTypes from '../types/blocks';

const initialState = {
  isLoading: false,
  data: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case blocksTypes.BLOCKS_LIST_GET_SUCCESS:
      return {
        ...state,
        isLoading: true,
        data: payload.data,
      };
    default:
      return state;
  }
}
