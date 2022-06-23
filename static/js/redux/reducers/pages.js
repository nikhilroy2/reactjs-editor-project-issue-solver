import * as pagesTypes from '../types/pages';

const initialState = {
  isLoading: false,
  activePage: false,
  data: [],
  pageMode: {
    isEdit: false,
    activeIdPage: null,
  },
  isFetching: false,
  error: false,
  errorResponseText: '',
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case pagesTypes.PAGES_GET_LIST_SUCCESS:
      return {
        ...state,
        isLoading: true,
        data: payload.data,
      };
    case pagesTypes.PAGES_ADD_ACTIVE_PAGE:
      return {
        ...state,
        activePage: payload.data,
      };

    case pagesTypes.PAGES_ADD_PAGE:
    case pagesTypes.PAGES_ADD_BLOG_PAGE:
      return {
        ...state,
        isFetching: true,
      };

    case pagesTypes.PAGES_ADD_PAGE_SUCESS:
    case pagesTypes.PAGES_ADD_BLOG_PAGE_SUCCESS:
      return {
        ...state,
        data: [...state.data, payload.data],
        isFetching: false,
        error: false,
        errorResponseText: '',
      };

    case pagesTypes.PAGES_ADD_PAGE_ERROR:
    case pagesTypes.PAGES_ADD_BLOG_PAGE_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorResponseText: payload.error.data.error_message,
      };

    case pagesTypes.PAGES_DELETE_PAGE_SUCCESS:
    case pagesTypes.PAGES_DELETE_BLOG_PAGE_SUCCESS:
      return {
        ...state,
        data: payload.data,
      };
    case pagesTypes.PAGES_DELETE_PAGE_ERROR:
    case pagesTypes.PAGES_DELETE_BLOG_PAGE_ERROR:
      return {
        ...state,
        error: true,
      };

    case pagesTypes.PAGES_UPDATE_PAGE:
      return {
        ...state,
        isFetching: true,
        error: false,
        errorResponseText: '',
      };
    case pagesTypes.PAGES_UPDATE_PAGE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: payload.data,
        error: false,
        errorResponseText: '',
      };
    case pagesTypes.PAGES_UPDATE_PAGE_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorResponseText: payload.error.data.error_message,
      };

    case pagesTypes.PAGE_EMPTY_FILTER:
      return {
        ...state,
        data: state.data.filter((item) => item.id),
      };

    case pagesTypes.SWITCH_PAGE_MODE:
      return {
        ...state,
        pageMode: payload.data,
      };

    case pagesTypes.CLEAR_ERROR_STATE:
      return {
        ...state,
        error: false,
        errorResponseText: '',
      };

    case pagesTypes.ADD_EMPTY_PAGE:
      return {
        ...state,
        data: [...state.data, payload.data],
      };
    default:
      return state;
  }
}
