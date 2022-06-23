import {
  call, put, takeEvery, delay,
} from 'redux-saga/effects';
import * as Sentry from '@sentry/browser';
import * as configurationTypes from '../types/configuration';
import { configurationGetList } from '../../services/urls/editor/configuration';
import {
  configurationListGet,
  configurationListGetSuccess,
  configurationListGetError,
} from '../actions/Configuration';

import {
  preloaderLockedMobile,
} from '../actions/Preloader';

/**
 * @function
 * @name configurationListGetSaga
 * @category Redux saga
 * @description saga получение конфига редактора
 */
export function* configurationListGetSaga() {
  try {
    const response = yield call(configurationGetList, null);
    if (response) {
      if (response.data.data) {
        yield delay(1000);

        // Записываем в Sentry для получения Admin ID пользователя
        Sentry.configureScope((scope) => {
          scope.setUser({ 'Admin ID': response.data.data.admin_id });
        });

        // Проверяем, зашел ли клиент с мобильного устройства
        if (response.data && response.data.data && response.data.data.is_mobile) {
          yield put(preloaderLockedMobile());
        }

        yield put(configurationListGetSuccess(response.data.data));
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(configurationListGetError(error.response));
    }
    yield delay(10000);
    yield put(configurationListGet());
  }
}

export default function* getBlockListActionWatcher() {
  yield takeEvery(configurationTypes.CONFIGURATION_LIST_GET, configurationListGetSaga);
}
