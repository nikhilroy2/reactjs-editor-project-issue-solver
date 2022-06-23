import * as dataTypes from '../../types/data';
import { changeData, changeDepsComponentData, componentSetDefault } from './_helper';
import * as componentsTypes from '../../types/components';

const initialState = {

};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case dataTypes.DATA_LIST_FORMAT_DATA_SUCCESS:
      return payload.data.footer ? payload.data.footer : state;
    case dataTypes.DATA_REPLACE_ALL:
      return payload.snippet === 'footer' ? payload.data : state;
    case dataTypes.DATA_VALUES_CHANGE:
      return changeData(state, payload);
    case componentsTypes.COMPONENTS_CHANGE_DATA_BLOCK:
      return changeDepsComponentData(state, payload);
    case componentsTypes.COMPONENTS_DATA_BLOCK_SET_DEFAULT:
      return componentSetDefault(state, payload);
    default:
      return state;
  }
}
