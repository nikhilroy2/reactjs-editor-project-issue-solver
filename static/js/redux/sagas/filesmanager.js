import {
  all, call, put, takeEvery, delay,
} from 'redux-saga/effects';
import * as filesManagerTypes from '../types/filesmanager';
import { filesManagerGetList, filesManagerPostUpload, filesManagerPostDelete } from '../../services/urls/editor/filesmanager';

import {
  filesManagerListSuccess,
  filesManagerListError,
  filesManagerDeleteSuccess,
  filesManagerDeleteError,
  filesManagerDeleteClearFetching,
  filesManagerUploadSuccess,
  filesManagerUploadError,
  filesManagerUploadPixabaySuccess,
  filesManagerUploadPixabayError,
  filesManagerUploadPixabayClearFetching,
} from '../actions/FilesManager';
import Notification from '../../utils/Notifications';

/**
 * @function
 * @name filesManagerGetListSaga
 * @category Redux saga
 * @description - Листинг всех картинок
 */
export function* filesManagerGetListSaga() {
  try {
    const response = yield call(filesManagerGetList, null);
    if (response) {
      if (response.data.data) {
        yield put(filesManagerListSuccess(response.data.data));
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(filesManagerListError(error.response));
    }
  }
}

/**
 * @function
 * @name filesManagerUploadSaga
 * @category Redux saga
 * @description - Загрузка картинки в файловый менеджер
 */
export function* filesManagerUploadSaga(action) {
  const { file } = action.payload;

  try {
    const response = yield call(filesManagerPostUpload, file);
    if (response) {
      if (response.data.data) {
        yield put(filesManagerUploadSuccess(response.data.data));
      }
    }
  } catch (error) {
    if (error.response) {
      yield Notification.onError(error.response);
      yield put(filesManagerUploadError(error.response));
    }
  }
}

/**
 * @function
 * @name filesManagerUploadPixabaySaga
 * @category Redux saga
 * @description - Загрузка картинки с Pixabay
 */
export function* filesManagerUploadPixabaySaga(action) {
  const { file, id } = action.payload;

  try {
    const response = yield call(filesManagerPostUpload, file);
    if (response) {
      if (response.data.data) {
        yield put(filesManagerUploadPixabaySuccess(response.data.data, id));
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(filesManagerUploadPixabayError(error.response, id));
    }
  }

  // Очищаем состояния карточки
  yield delay(1000);
  yield put(filesManagerUploadPixabayClearFetching(id));
}

/**
 * @function
 * @name filesManagerDeleteSaga
 * @category Redux saga
 * @description - Удаление картинки из файлового менеджера
 */
export function* filesManagerDeleteSaga(action) {
  const { id } = action.payload;

  try {
    const response = yield call(filesManagerPostDelete, id);
    if (response) {
      if (response.data.data) {
        yield put(filesManagerDeleteSuccess(id));
        yield put(filesManagerDeleteClearFetching(id));
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(filesManagerDeleteError(error.response));
      yield Notification.onError(error.response);
      yield delay(1000);
      yield put(filesManagerDeleteClearFetching(id));
    }
  }
}

export default function* watchGetImages() {
  yield all([
    yield takeEvery(filesManagerTypes.FILES_MANAGER_LIST, filesManagerGetListSaga),
    yield takeEvery(filesManagerTypes.FILES_MANAGER_UPLOAD, filesManagerUploadSaga),
    yield takeEvery(filesManagerTypes.FILES_MANAGER_UPLOAD_PIXABAY, filesManagerUploadPixabaySaga),
    yield takeEvery(filesManagerTypes.FILES_MANAGER_DELETE, filesManagerDeleteSaga),
  ]);
}
