import {
  call, put, takeEvery, select,
} from 'redux-saga/effects';
import * as colorsTypes from '../types/colors';
import {
  colorsGetList, colorsPostAdd, colorsPostUpdate, colorsPostDelete,
} from '../../services/urls/editor/colors';
import {
  colorsListGetSuccess,
  colorsListGetError,
  colorsAddSuccess,
  colorsAddError,
  colorsDeleteSuccess,
  colorsDeleteError,
  colorsUpdate,
  colorsUpdateSuccess,
  colorsUpdateError,
} from '../actions/Colors';

/**
 * @function
 * @name colorsListGetSaga
 * @category Redux saga
 * @description - Листинг всех цветов добавленных в библиотеку
 */
export function* colorsListGetSaga() {
  try {
    const response = yield call(colorsGetList, null);
    if (response) {
      if (response.data.data) {
        yield put(colorsListGetSuccess(response.data.data));
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(colorsListGetError(error.response));
    }
  }
}

/**
 * @function
 * @name colorsAddSaga
 * @category Redux saga
 * @description - Добавление цвета в библиотеку
 */
export function* colorsAddSaga(action) {
  const { type, value } = action.payload;
  try {
    // 1 - Запрос на бек
    const response = yield call(colorsPostAdd, type, value);
    if (response) {
      if (response.data.data) {
        // 2 - Записываем новый ID в store
        yield put(colorsAddSuccess(response.data.data));
        // 3 - Обновляем значения на беке для созданного цвета
        if (response.data.data.id) {
          const {
            colors: { data },
          } = yield select();
          const currentColor = data[0];
          yield put(colorsUpdate(currentColor.id, currentColor.type, currentColor.value));
        }
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(colorsAddError(error.response));
    }
  }
}

/**
 * @function
 * @name colorsDeleteSaga
 * @category Redux saga
 * @description - Удаление цвета из библиотеки
 */
export function* colorsDeleteSaga(action) {
  const { color_id } = action.payload;
  try {
    const response = yield call(colorsPostDelete, color_id);
    if (response) {
      if (response.data.data) {
        yield put(colorsDeleteSuccess(color_id));
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(colorsDeleteError(error.response));
    }
  }
}

/**
 * @function
 * @name colorsUpdateSaga
 * @category Redux saga
 * @description - Обновление цвета из библиотеки
 */
export function* colorsUpdateSaga(action) {
  const { color_id, type, value } = action.payload;

  try {
    const response = yield call(colorsPostUpdate, color_id, type, value);

    if (response) {
      if (response.data.data) {
        yield put(colorsUpdateSuccess(color_id));
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(colorsUpdateError(error.response));
    }
  }
}
export default function* () {
  yield takeEvery(colorsTypes.COLORS_LIST_GET, colorsListGetSaga);
  yield takeEvery(colorsTypes.COLORS_ADD, colorsAddSaga);
  yield takeEvery(colorsTypes.COLORS_DELETE, colorsDeleteSaga);
  yield takeEvery(colorsTypes.COLORS_UPDATE, colorsUpdateSaga);
}
