import {
  all, call, put, select, takeEvery,
} from 'redux-saga/effects';
import * as languagesTypes from '../types/languages';
import {
  languagesGetList,
  languagesGetTranslation,
  languagesResetTranslation,
  languagesMakeDefault,
  languagesUpdatePositions,
  languagesActive,
  languagesAdd,
  languagesUpdateTranslation,
  languagesGetAllList,
  languagesDelete,
} from '../../services/urls/editor/languages';
import {
  languagesGetListSuccess,
  languagesGetListError,
  languagesTranslationsGetSuccess,
  languagesTranslationsGetError,

  languagesSaveTranslationsSuccess,
  languagesSaveTranslationsError,

  languagesResetTranslationsSuccess,
  languagesResetTranslationsError,

  languagesMakeDefaultSuccess,
  languagesMakeDefaultError,

  languagesSortableSuccess,
  languagesSortableError,

  languagesActivateSuccess,
  languagesActivateError,

  languagesAddSuccess,
  languagesAddError,

  languagesAllListSuccess,
  languagesAllListError,

  languagesDeleteSuccess,
  languagesDeleteError,

  languagesUpdateCurrentTranslation,
} from '../actions/Languages';

import { loadData } from '../actions/Preloader';

/**
 * @function
 * @name languagesGetListSaga
 * @category Redux saga
 * @description - Получение списка добавленных языков
 */
export function* languagesGetListSaga() {
  try {
    const response = yield call(languagesGetList, null);
    if (response) {
      if (response.data.data) {
        yield put(languagesGetListSuccess(response.data.data));
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(languagesGetListError(error.response));
    }
  }
}

/**
 * @function
 * @name languagesAllListSaga
 * @category Redux saga
 * @description - Получение списка всех языков
 */
export function* languagesAllListSaga() {
  try {
    const response = yield call(languagesGetAllList, null);
    if (response) {
      if (response.data.data) {
        yield put(languagesAllListSuccess(response.data.data));
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(languagesAllListError(error.response));
    }
  }
}

/**
 * @function
 * @name languagesTranslationsGetSaga
 * @category Redux saga
 * @description - Получение перевод активного языка
 */
export function* languagesTranslationsGetSaga() {
  try {
    const response = yield call(languagesGetTranslation, null);
    if (response) {
      if (response.data.data) {
        yield put(languagesTranslationsGetSuccess(response.data.data));
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(languagesTranslationsGetError(error.response));
    }
  }
}

/**
 * @function
 * @name languagesTranslationsGetSaga
 * @category Redux saga
 * @description - Получение перевод активного языка
 */
export function* languagesSaveTranslationsSaga(action) {
  try {
    const { popupTranslations } = yield select((state) => state.languages);
    // popupTranslations
    const { code, data } = action.payload;
    const response = yield call(languagesUpdateTranslation, code, data);
    if (response) {
      if (response.data.data) {
        yield put(languagesSaveTranslationsSuccess(code, response.data.data));
        if (popupTranslations.default) {
          yield put(languagesUpdateCurrentTranslation(response.data.data));
        }
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(languagesSaveTranslationsError(error.response));
    }
  }
}

/**
 * @function
 * @name languagesResetTranslationsSaga
 * @category Redux saga
 * @description - Скинуть перевод активного языка
 */
export function* languagesResetTranslationsSaga(action) {
  try {
    const { code } = action.payload;
    const response = yield call(languagesResetTranslation, code);
    if (response) {
      if (response.data.data) {
        yield put(languagesResetTranslationsSuccess(response.data.data));
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(languagesResetTranslationsError(error.response));
    }
  }
}

/**
 * @function
 * @name languagesDeleteSaga
 * @category Redux saga
 * @description - Скинуть перевод активного языка
 */
export function* languagesDeleteSaga(action) {
  try {
    const { code } = action.payload;
    const response = yield call(languagesDelete, code);
    if (response) {
      if (response.data.data) {
        yield put(languagesDeleteSuccess(code));
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(languagesDeleteError(error.response));
    }
  }
}

/**
 * @function
 * @name languagesMakeDefaultSaga
 * @category Redux saga
 * @description - Скинуть перевод активного языка
 */
export function* languagesMakeDefaultSaga(action) {
  try {
    const { code } = action.payload;
    const response = yield call(languagesMakeDefault, code);
    if (response) {
      if (response.data.data) {
        yield put(languagesMakeDefaultSuccess(response.data.data));
        yield put(loadData(null));
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(languagesMakeDefaultError(error.response));
    }
  }
}

/**
 * @function
 * @name languagesSortableSaga
 * @category Redux saga
 * @description - Сортировка
 */
export function* languagesSortableSaga(action) {
  try {
    const { data, positions } = action.payload;
    yield call(languagesUpdatePositions, positions);
    yield put(languagesSortableSuccess(data));
  } catch (error) {
    if (error.response) {
      yield put(languagesSortableError(error.response));
    }
  }
}

/**
 * @function
 * @name languagesActivateSaga
 * @category Redux saga
 * @description - Включить/Выключить язык
 */
export function* languagesActivateSaga(action) {
  try {
    const { code, active } = action.payload;
    const response = yield call(languagesActive, code, active);
    if (response) {
      if (response.data.data) {
        yield put(languagesActivateSuccess(response.data.data));
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(languagesActivateError(error.response));
    }
  }
}

/**
 * @function
 * @name languagesAddSaga
 * @category Redux saga
 * @description - Добавить новый язык
 */
export function* languagesAddSaga(action) {
  try {
    const { code } = action.payload;
    const response = yield call(languagesAdd, code);
    if (response) {
      if (response.data.data) {
        yield put(languagesAddSuccess(response.data.data));
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(languagesAddError(error.response));
    }
  }
}

/**
 * @function
 * @name languagesTranslationMode
 * @category Redux saga
 * @description - режим перевода
 */
export function* languagesTranslationMode() {
  yield put(loadData(null));
}

export default function* () {
  yield all([
    yield takeEvery(languagesTypes.LANGUAGES_LIST_GET, languagesGetListSaga),
    yield takeEvery(languagesTypes.LANGUAGES_TRANSLATIONS_GET, languagesTranslationsGetSaga),
    yield takeEvery(languagesTypes.LANGUAGES_SAVE_TRANSLATIONS, languagesSaveTranslationsSaga),
    yield takeEvery(languagesTypes.LANGUAGES_RESET_TRANSLATIONS, languagesResetTranslationsSaga),
    yield takeEvery(languagesTypes.LANGUAGES_MAKE_DEFAULT, languagesMakeDefaultSaga),
    yield takeEvery(languagesTypes.LANGUAGES_SORTABLE, languagesSortableSaga),
    yield takeEvery(languagesTypes.LANGUAGES_ACTIVATE, languagesActivateSaga),
    yield takeEvery(languagesTypes.LANGUAGES_ADD_LANGUAGE, languagesAddSaga),
    yield takeEvery(languagesTypes.LANGUAGES_TRANSLATION_MODE, languagesTranslationMode),
    yield takeEvery(languagesTypes.LANGUAGES_ALL_LIST, languagesAllListSaga),
    yield takeEvery(languagesTypes.LANGUAGES_DELETE_LANGUAGE, languagesDeleteSaga),
  ]);
}
