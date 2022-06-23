import * as preloaderTypes from '../types/preloader';

const initialState = {
  isLoading: true,
  isLockedTab: false,
  isLockedMobile: false,
  progress: 0,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case preloaderTypes.PRELOADER:
      return {
        ...state,
        isLoading: true,
      };
    case preloaderTypes.PRELOADER_SUCCESS:
      return {
        ...state,
        progress: 0,
        isLoading: false,
      };
    case preloaderTypes.PRELOADER_ERROR:
      return {
        ...state,
        isLoading: true,
      };
    case preloaderTypes.PRELOADER_PROGRESS:
      return {
        ...state,
        progress: payload.progress,
      };
    case preloaderTypes.PRELOADER_LOCKED_TAB:
      return {
        ...state,
        isLockedTab: true,
      };
    case preloaderTypes.PRELOADER_LOCKED_MOBILE:
      return {
        ...state,
        isLockedMobile: true,
      };
    default:
      return state;
  }
}
