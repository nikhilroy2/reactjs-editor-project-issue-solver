import * as dataTypes from '../../types/data';
import * as depsTypes from '../../types/deps';
import * as componentsTypes from '../../types/components';
import {
  componentSetDefault, changeDepsComponentData, changeData, changeDeps, depsCreate,
} from './_helper';

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case dataTypes.DATA_LIST_FORMAT_DATA_SUCCESS:
      return payload.data.page ? payload.data.page : state;
    case dataTypes.DATA_REPLACE_ALL:
      return payload.snippet === 'page' ? payload.data : state;
    case dataTypes.DATA_VALUES_CHANGE:
      return changeData(state, payload);
    case depsTypes.DEPS_VALUES_CHANGE:
      return changeDeps(state, payload);
    case componentsTypes.COMPONENTS_CHANGE_DATA_BLOCK:
      return changeDepsComponentData(state, payload);
    case componentsTypes.COMPONENTS_DATA_BLOCK_SET_DEFAULT:
      return componentSetDefault(state, payload);
    case dataTypes.DATA_DEPS_CREATE_SUCCESS:
      return depsCreate(state, payload);
    default:
      return state;
  }
}
