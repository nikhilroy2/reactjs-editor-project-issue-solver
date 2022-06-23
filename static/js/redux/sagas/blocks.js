import { call, put, takeEvery } from 'redux-saga/effects';
import * as blocksTypes from '../types/blocks';
import { blocksListGet } from '../../services/urls/editor/blocks';
import { blocksListGetSuccess, blocksListGetError } from '../actions/Blocks';

/**
 * @name blocksListGetSaga
 * @function
 * @category Redux saga
 * @description saga листинг компонентов
 */
export function* blocksListGetSaga() {
  try {
    const response = yield call(blocksListGet, null);
    if (response) {
      if (response.data.data) {
        yield put(blocksListGetSuccess(response.data.data));
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(blocksListGetError(error.response));
    }
  }
}

export default function* getBlockListActionWatcher() {
  yield takeEvery(blocksTypes.BLOCKS_LIST_GET, blocksListGetSaga);
}
