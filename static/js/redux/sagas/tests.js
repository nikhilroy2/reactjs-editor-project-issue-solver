import {
  all, call, put, takeEvery,
} from 'redux-saga/effects';
import * as testsTypes from '../types/tests';
import { getTestRequest } from '../../services/urls/editor/tests';
import { testsPagesSuccess, testsPagesError } from '../actions/Tests';

export function* pagesGetListSaga() {
  try {
    const response = yield call(getTestRequest, null);
    if (response) {
      yield put(testsPagesSuccess(response.data));
    }
  } catch (error) {
    if (error.response) {
      yield put(testsPagesError(error.response));
    }
  }
}

export default function* testsSaga() {
  yield all([yield takeEvery(testsTypes.TESTS_GET, pagesGetListSaga)]);
}
