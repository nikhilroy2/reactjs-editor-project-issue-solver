import * as actionTypes from '../types/filesmanager';

const initialState = {
  data: [],
  isFetching: false,
  isFetchingUploadImage: false,
  isFetchingDeleteFile: false,
  isFetchingDelete: {
    loader: false,
    failed: false,
  },
  isFetchingLoadPixabay: false,
  isFetchingPixabay: {
    complete: false,
    pending: false,
    failed: false,
  },
  isUploadedNewImage: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.FILES_MANAGER_LIST_SUCCESS:
      return {
        ...state,
        isLoading: true,
        data: payload.data,
      };
    case actionTypes.FILES_MANAGER_UPLOAD_PIXABAY:
      return {
        ...state,
        isFetchingLoadPixabay: true,
        isFetchingPixabay: {
          ...state.isFetchingPixabay,
          pending: payload.id,
        },
      };
    case actionTypes.FILES_MANAGER_UPLOAD_PIXABAY_SUCCESS:
      return {
        ...state,
        data: [payload.data, ...state.data],
        isUploadedNewImage: true,
        isFetchingPixabay: {
          ...state.isFetchingPixabay,
          pending: false,
          complete: payload.id,
        },
      };
    case actionTypes.FILES_MANAGER_UPLOAD_PIXABAY_ERROR:
      return {
        ...state,
        isFetchingPixabay: {
          ...state.isFetchingPixabay,
          pending: false,
          failed: payload.id,
        },
      };
    case actionTypes.FILES_MANAGER_UPLOAD_PIXABAY_CLEAR_FETCHING:
      return {
        ...state,
        isFetchingLoadPixabay: false,
        isFetchingPixabay: {
          ...state.isFetchingPixabay,
          complete: false,
          failed: false,
        },
      };
    case actionTypes.FILES_MANAGER_UPLOAD:
      return {
        ...state,
        isFetchingUploadImage: true,
      };
    case actionTypes.FILES_MANAGER_UPLOAD_SUCCESS:
      return {
        ...state,
        data: [...state.data, payload.data],
        isFetchingUploadImage: false,
      };
    case actionTypes.FILES_MANAGER_UPLOAD_ERROR:
      return {
        ...state,
        isFetchingUploadImage: false,
      };
    case actionTypes.FILES_MANAGER_DELETE:
      return {
        ...state,
        isFetchingDeleteFile: true,
        isFetchingDelete: {
          ...state.isFetchingDelete,
          loader: payload.id,
        },
      };
    case actionTypes.FILES_MANAGER_DELETE_SUCCESS:
      return {
        ...state,
        data: state.data.filter(((image) => Number(image.id) !== Number(payload.id))),
        isFetchingDelete: {
          ...state.isFetchingDelete,
          loader: false,
          failed: false,
        },
      };
    case actionTypes.FILES_MANAGER_DELETE_ERROR:
      return {
        ...state,
        data: state.data.map(((image) => {
          if (Number(image.id) === Number(payload.id)) {
            image.status = false
          }
          return image;
        })),
        isFetchingDelete: {
          ...state.isFetchingDelete,
          loader: false,
          failed: payload.id,
        },
      };
    case actionTypes.FILES_MANAGER_DELETE_CLEAR_FETCHING:
      return {
        ...state,
        isFetchingDeleteFile: false,
        isFetchingDelete: {
          ...state.isFetchingDelete,
          loader: false,
          failed: false,
        },
      };
    case actionTypes.FILES_MANAGER_NEW_IMAGE_CLEAR:
      return {
        ...state,
        isUploadedNewImage: false,
      };
    default:
      return state;
  }
}
