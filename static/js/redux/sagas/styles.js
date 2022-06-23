import {
  all, call, put, takeEvery,
} from 'redux-saga/effects';
import * as stylesTypes from '../types/styles';
import { stylesGetList, stylesPostActivateStyle } from '../../services/urls/editor/styles';
import {
  stylesListGetSuccess,
  stylesListGetError,
  stylesActiveStyleSuccess,
  stylesActiveStyleError,
} from '../actions/Styles';

import { componentsListGetSuccess } from '../actions/Components';
import Notification from '../../utils/Notifications';

/**
 * @function
 * @name stylesGetListSaga
 * @category Redux saga
 * @description - Листинг стилей
 */
export function* stylesGetListSaga() {
  try {
    const response = yield call(stylesGetList, null);
    if (response) {
      if (response.data.data) {
        yield put(stylesListGetSuccess(response.data.data));
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(stylesListGetError(error.response));
    }
  }
}

/**
 * @function
 * @name stylesPostActivateStyleSaga
 * @category Redux saga
 * @description - Активация стиля
 */
export function* stylesPostActivateStyleSaga(action) {
  const { id } = action.payload;
  try {
    // 1 - Запрос на бек
    const response = yield call(stylesPostActivateStyle, id);
    if (response) {
      if (response.data.data) {
        // 2 - Записываем в store новую components data
        yield put(componentsListGetSuccess(response.data.data));
        // 3 - Меняем листинг стилей
        yield put(stylesActiveStyleSuccess(id));
      }
    }
  } catch (error) {
    if (error.response) {
      yield Notification.onError(error.response);
      yield put(stylesActiveStyleError(error.response));
    }
  }
}

export default function* dataSaga() {
  yield all([
    yield takeEvery(stylesTypes.STYLES_LIST_GET, stylesGetListSaga),
    yield takeEvery(stylesTypes.STYLES_ACTIVATE_STYLE, stylesPostActivateStyleSaga),
  ]);
}
