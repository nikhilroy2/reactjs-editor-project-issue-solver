import { call, put, takeEvery } from 'redux-saga/effects';
import * as componentsTypes from '../types/components';
import {
  componentsGetList,
  componentsPostUpdateDataBlock,
  componentsPostSetDefaultDataBlock,
  componentsPostUpdateData,
  componentsPostSetDefaultData,
} from '../../services/urls/editor/components';
import {
  componentsListGetSuccess,
  componentsListGetError,
  componentsChangeDataError,
  componentsDataSetToDefaultSuccess,
  componentsDataSetToDefaultError,
} from '../actions/Components';
import { dataChangeComponentDataError, dataComponentSetDefaultError } from '../actions/data/deps';
import Methods from '../../utils/Methods/index';
import Notification from '../../utils/Notifications';

/**
 * @function
 * @name componentsListGetSaga
 * @category Redux saga
 * @description saga листинг компонентов
 */
export function* componentsListGetSaga() {
  try {
    const response = yield call(componentsGetList, null);
    if (response) {
      if (response.data.data) {
        yield put(componentsListGetSuccess(response.data.data));
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(componentsListGetError(error.response));
    }
  }
}

/**
 * @function
 * @name componentsUpdateDataBlockSaga
 * @category Redux saga
 * @description saga обновление data конкретного блока
 */
export function* componentsUpdateDataBlockSaga(action) {
  const { dataID, componentName, data } = action.payload;
  try {
    // 1 - Запрос на бек
    const response = yield call(componentsPostUpdateDataBlock, dataID, componentName, data);
    if (response && response.data && !response.data.success) {
      // 2 - Только в случае ошибки приостанавливаем реакт
    }
  } catch (error) {
    if (error.response) {
      yield Notification.onError(error.response);
      yield put(dataChangeComponentDataError(error.response));
    }
  }
}

/**
 * @function
 * @name componentsSetDefaultDataBlockSaga
 * @category Redux saga
 * @description saga сброс data компонента конкретного блока
 */
export function* componentsSetDefaultDataBlockSaga(action) {
  const { dataID, componentName } = action.payload;
  try {
    // 1 - Запрос на бек
    const response = yield call(componentsPostSetDefaultDataBlock, dataID, componentName);
    if (response && response.data && !response.data.success) {
      // 2 - Только в случае ошибки приостанавливаем реакт
    }
  } catch (error) {
    if (error.response) {
      yield Notification.onError(error.response);
      yield put(dataComponentSetDefaultError(error.response));
    }
  }
}

/**
 * @function
 * @name componentsUpdateDataSaga
 * @category Redux saga
 * @description saga обновление data компонента
 */
export function* componentsUpdateDataSaga(action) {
  const { code } = action.payload;
  try {
    // 1 - Получаем актуальную data компонента
    const data = Methods.getComponentData(code);
    if (data) {
      // 2 - Запрос на бек
      const response = yield call(componentsPostUpdateData, code, data);
      if (response && response.data && !response.data.success) {
        // 3 - Только в случае ошибки приостанавливаем реакт
      }
    }
  } catch (error) {
    if (error.response) {
      yield Notification.onError(error.response);
      yield put(componentsChangeDataError(error.response));
    }
  }
}

/**
 * @function
 * @name componentsSetDefaultDataSaga
 * @category Redux saga
 * @description saga сброс data компонента
 */
export function* componentsSetDefaultDataSaga(action) {
  const { code } = action.payload;
  try {
    // 1 - Запрос на бек
    const response = yield call(componentsPostSetDefaultData, code);
    if (response && response.data) {
      // 2 - Записываем в store
      yield put(componentsDataSetToDefaultSuccess(code, response.data.data));
    }
  } catch (error) {
    if (error.response) {
      yield Notification.onError(error.response);
      yield put(componentsDataSetToDefaultError(code, error.response));
    }
  }
}

export default function* () {
  yield takeEvery(componentsTypes.COMPONENTS_LIST_GET, componentsListGetSaga);
  yield takeEvery(componentsTypes.COMPONENTS_CHANGE_DATA_BLOCK, componentsUpdateDataBlockSaga);
  yield takeEvery(componentsTypes.COMPONENTS_DATA_BLOCK_SET_DEFAULT, componentsSetDefaultDataBlockSaga);
  yield takeEvery(componentsTypes.COMPONENTS_CHANGE_DATA, componentsUpdateDataSaga);
  yield takeEvery(componentsTypes.COMPONENTS_DATA_SET_DEFAULT, componentsSetDefaultDataSaga);
}
