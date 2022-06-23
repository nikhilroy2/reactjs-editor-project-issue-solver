import {
  all, call, put, takeEvery, delay,
} from 'redux-saga/effects';
import * as publishTypes from '../types/publish';
import { publish } from '../../services/urls/editor/publish';
import { publishPagesSuccess, publishPagesError, publishSetDefault } from '../actions/Publish';

import Notification from '../../utils/Notifications';
/**
 * @function
 * @name publishPagesSaga
 * @category Redux saga
 * @description - Сохранение data всех страниц
 */
export function* publishPagesSaga() {
  try {
    const response = yield call(publish, null);
    if (response) {
      if (response.data.data) {
        yield put(publishPagesSuccess(response.data.data));
        Notification.publish();
        yield delay(3000);
        yield put(publishSetDefault());
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(publishPagesError(error.response));
      yield Notification.onError(error.response);
      yield delay(3000);
      yield put(publishSetDefault());
    }
  }
}

export default function* () {
  yield all([yield takeEvery(publishTypes.PUBLISH, publishPagesSaga)]);
}
