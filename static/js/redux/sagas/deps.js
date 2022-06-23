import {
  all,
  put,
  takeEvery,
  call,
} from 'redux-saga/effects';
import _ from 'lodash';
import * as depsTypes from '../types/deps';
import {
  depsIsLoading, depsIsLoadingSuccess, depsIsLoadingError, depsChangeValues,
} from '../actions/data/deps';
import Notification from '../../utils/Notifications';
import { getQueryInstance } from '../../services/helper';
import { getSourceValue } from '../../utils/SourceValue';

/**
 * @function
 * @name depsChangeSaga
 * @category Redux saga
 * @description - Получение листинга блока
 */
export function* requestSaga(request, dataID) {
  if (request && dataID) {
    try {
      if (request) {
        const requestData = {};
        if (request.preloader) {
          yield put(depsIsLoading());
        }
        if (request.hasOwnProperty('params')) {
          Object.keys(request.params).forEach((paramKey) => {
            const value = getSourceValue(request.params[paramKey].source, dataID);
            if (value !== 'not found') {
              requestData[paramKey] = value;
            }
          })
        }
        if (request.hasOwnProperty('query')) {
          Object.keys(request.query).forEach((paramKey) => {
            if (_.isObject(request.query[paramKey])) {
              const value = getSourceValue(request.query[paramKey].source, dataID);
              if (value !== 'not found') {
                requestData[paramKey] = value;
              }
            }
            if (_.isString(request.query[paramKey])) {
              requestData[paramKey] = request.query[paramKey];
            }
          })
        }
        if (request.hasOwnProperty('data')) {
          Object.keys(request.data).forEach((paramKey) => {
            const value = getSourceValue(request.data[paramKey].source, dataID);
            if (value !== 'not found') {
              requestData[paramKey] = value;
            }
          })
        }
        if (request.hasOwnProperty('customData')) {
          Object.keys(request.customData).forEach((paramKey) => {
            requestData[paramKey] = request.customData[paramKey];
          })
        }
        const queryInstance = getQueryInstance(request);
        if (queryInstance) {
          const response = yield queryInstance(requestData)
          if (response.data && response.data.data) {
            if (request.to && request.to === 'deps') {
              yield put(depsChangeValues(response.data.data, false, dataID, false))
              yield put(depsIsLoadingSuccess());
            }
          }
        }
      }
    } catch (error) {
      if (request.preloader) {
        yield put(depsIsLoadingError());
      }
      if (error.response) {
        Notification.onError(error.response);
      }
    }
  }
}

/**
 * @function
 * @name depsChangeSaga
 * @category Redux saga
 * @description - Получение листинга блока
 */
export function* depsChangeSaga(action) {
  const { request, dataID } = action.payload;
  yield call(requestSaga, request, dataID)
}

/**
 * @function
 * @name depsDataRequest
 * @category Redux saga
 * @description - Запросы для deps
 */
export function* depsDataRequest(action) {
  const { request, dataID } = action.payload;
  yield call(requestSaga, request, dataID)
}

export default function* dataSaga() {
  yield all([
    yield takeEvery(depsTypes.DEPS_VALUES_CHANGE, depsChangeSaga),
    yield takeEvery(depsTypes.DEPS_REQUEST, depsDataRequest),
  ]);
}
