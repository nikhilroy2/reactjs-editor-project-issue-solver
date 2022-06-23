import * as dataTypes from '../../types/data';
import * as stylesTypes from '../../types/styles';
import * as depsTypes from '../../types/deps';

const initialState = false;

export default function (state = initialState, action) {
  const { type } = action;

  switch (type) {
    case dataTypes.DATA_ADD:
    case dataTypes.DATA_DUPLICATE:
    case dataTypes.DATA_DELETE:
    case dataTypes.DATA_SORTABLE:
    case stylesTypes.STYLES_ACTIVATE_STYLE:
    case depsTypes.DEPS_LOADING:
      return true;
    case dataTypes.DATA_ADD_SUCCESS:
    case dataTypes.DATA_ADD_ERROR:
    case dataTypes.DATA_DUPLICATE_SUCCESS:
    case dataTypes.DATA_DUPLICATE_ERROR:
    case dataTypes.DATA_DELETE_SUCCESS:
    case dataTypes.DATA_DELETE_ERROR:
    case dataTypes.DATA_SORTABLE_SUCCESS:
    case dataTypes.DATA_SORTABLE_ERROR:
    case stylesTypes.STYLES_ACTIVATE_STYLE_SUCCESS:
    case stylesTypes.STYLES_ACTIVATE_STYLE_ERROR:
    case depsTypes.DEPS_LOADING_SUCCESS:
    case depsTypes.DEPS_LOADING_ERROR:
      return false;
    default:
      return state;
  }
}
