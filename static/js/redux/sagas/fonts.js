import {
  all, call, put, takeEvery, delay, select,
} from 'redux-saga/effects';
import * as fontsTypes from '../types/fonts';
import {
  fontsGetList, fontsActiveList, activateFont, deleteFont, fontsUpdateGroupOptions, fontsResetOptions,
} from '../../services/urls/editor/fonts';
import {
  fontsListGetSuccess,
  fontsListGetError,
  fontsActiveGet,
  fontsActiveGetSuccess,
  fontsActiveGetError,
  removeFontSuccess,
  removeFontError,
  uploadFontSuccess,
  uploadFontError,
  fontsChangeGroupOptionsError,
  fontsResetSuccess,
  fontsResetError,
  fontsUpdatePairSuccess,
} from '../actions/Fonts';
import {
  componentsDataSetToDefaultSuccess,
} from '../actions/Components'
import Notification from '../../utils/Notifications';

/**
 * @function
 * @name fontsListGetSaga
 * @category Redux saga
 * @description - Получение списка всех шрифтов (Google fonts)
 */
export function* fontsListGetSaga() {
  try {
    const response = yield call(fontsGetList, null);
    if (response) {
      if (response.data.data) {
        yield put(fontsListGetSuccess(response.data.data));
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(fontsListGetError(error.response));
    }
  }
}

/**
 * @function
 * @name fontsActiveGetSaga
 * @category Redux saga
 * @description - Получение списка активных шрифтов
 */
export function* fontsActiveGetSaga() {
  try {
    const response = yield call(fontsActiveList, null);
    if (response) {
      if (response.data.data) {
        yield put(fontsActiveGetSuccess(response.data.data));
      }
    }
  } catch (error) {
    if (error.response) {
      yield Notification.onError(error.response);
      yield put(fontsActiveGetError(error.response));
    }
  }
}

/**
 * @function
 * @name addFontToActiveSaga
 * @category Redux saga
 * @description - Добавление шрифта в список активных
 */
export function* addFontToActiveSaga(action) {
  const { id } = action.payload;
  try {
    const response = yield call(activateFont, id);
    if (response) {
      if (response.data.data) {
        yield put(uploadFontSuccess(id, true));
        yield put(fontsActiveGet());
        yield delay(3000);
        yield put(uploadFontSuccess(id, false));
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(uploadFontError(true));
      yield Notification.onError(error.response);
      yield delay(3000);
      yield put(uploadFontSuccess(false));
    }
  }
}

/**
 * @function
 * @name removeFontFromActiveSaga
 * @category Redux saga
 * @description - Удаление шрифта из списка активных
 */
export function* removeFontFromActiveSaga(action) {
  const { id } = action;
  try {
    const response = yield call(deleteFont, id);
    if (response) {
      if (response.data.data) {
        yield put(removeFontSuccess(id))
      }
    }
  } catch (error) {
    if (error.response) {
      yield Notification.onError(error.response);
      yield put(removeFontError(error.response));
    }
  }
}

/**
 * @function
 * @name fontsChangeGroupOption
 * @category Redux saga
 * @description - Изменение опций группы
 */
export function* fontsChangeGroupOption(action) {
  const { group, data } = action.payload;
  try {
    yield call(fontsUpdateGroupOptions, group, data);
  } catch (error) {
    if (error.response) {
      yield Notification.onError(error.response);
      yield put(fontsChangeGroupOptionsError(error.response));
    }
  }
}

/**
 * @function
 * @name fontsReset
 * @category Redux saga
 * @description - Изменение опций группы
 */
export function* fontsReset(action) {
  const { component_code } = action.payload;
  try {
    const response = yield call(fontsResetOptions, component_code);
    if (response) {
      if (response.data.data) {
        yield put(fontsResetSuccess(response.data.data))
        yield put(componentsDataSetToDefaultSuccess(component_code, response.data.data.component))
      }
    }
  } catch (error) {
    if (error.response) {
      yield Notification.onError(error.response);
      yield put(fontsResetError(error.response));
    }
  }
}

/**
 * @function
 * @name fontsReset
 * @category Redux saga
 * @description - Изменение опций группы
 */
export function* fontsUpdatePair(action) {
  const fontOptions = yield select((state) => state.fonts.options)
  const { pair } = action.payload;
  try {
    const headers = {
      font_id: pair.headers.font_id,
    }
    const body = {
      font_id: pair.body.font_id,
    }
    const responseHeaders = yield call(fontsUpdateGroupOptions, 'headers', headers);
    const responseBody = yield call(fontsUpdateGroupOptions, 'body', body);

    const options = [...responseHeaders.data.data, ...responseBody.data.data].reduce((accumulator, currentValue) => {
      const key = currentValue.tag;
      const font_id = currentValue.font_id;
      const options = fontOptions[key]
      accumulator[key] = {}
      accumulator[key] = {
        ...options,
        font_id,
        group: key === 'body' ? 'body' : 'headers',
      }
      return accumulator;
    }, {})
    yield put(fontsUpdatePairSuccess(options))
  } catch (error) {
    if (error.response) {
      yield Notification.onError(error.response);
      yield put(fontsChangeGroupOptionsError(error.response));
    }
  }
}

export default function* () {
  yield all([
    yield takeEvery(fontsTypes.FONTS_LIST_GET, fontsListGetSaga),
    yield takeEvery(fontsTypes.FONTS_ACTIVE_GET, fontsActiveGetSaga),
    yield takeEvery(fontsTypes.ADD_FONT, addFontToActiveSaga),
    yield takeEvery(fontsTypes.REMOVE_FONT, removeFontFromActiveSaga),
    yield takeEvery(fontsTypes.FONTS_CHANGE_GROUP_OPTION, fontsChangeGroupOption),
    yield takeEvery(fontsTypes.FONTS_RESET, fontsReset),
    yield takeEvery(fontsTypes.FONTS_UPDATE_PAIR, fontsUpdatePair),
  ])
}
