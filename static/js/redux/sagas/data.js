import {
  all,
  call,
  put,
  takeEvery,
  take,
  delay,
  select,
} from 'redux-saga/effects';
import * as dataTypes from '../types/data';
import Methods from '../../utils/Methods/index';
import {
  dataGetList,
  dataPostAddBlock,
  dataPostDuplicateBlock,
  dataPostDeleteBlock,
  dataPostSortableBlocks,
  dataPostUpdateBlock,
} from '../../services/urls/editor/data';
import {
  dataListGetSuccess,
  dataListGetError,
  dataListGetFormatDataSuccess,
} from '../actions/data/list';
import { dataChangeValuesError, dataReplaceAll } from '../actions/data/update';
import { dataAddSuccess, dataAddError } from '../actions/data/add';
import {
  dataSortableSuccess,
  dataSortableError,
} from '../actions/data/sortable';
import {
  dataDuplicateSuccess,
  dataDuplicateError,
} from '../actions/data/duplicate';

import { dataDeleteSuccess } from '../actions/data/delete';
import { blocksListGet } from '../actions/Blocks';
import fontsGenerate from '../../utils/fontsGenerate';
import Notification from '../../utils/Notifications';

/**
 * @function
 * @name dataGetListSaga
 * @category Redux saga
 * @description - Получение листинга блока
 */
export function* dataGetListSaga() {
  try {
    // 1 - Запрос на бек
    const response = yield call(dataGetList, null);
    if (response) {
      if (response.data.data) {
        yield put(dataListGetSuccess(response.data.data));
        // 2 - Ждем пока загрузится все и список блоков
        yield take(dataTypes.DATA_LIST_FORMAT_DATA);
        // 3 - Генерим первый фонты
        const activeFonts = yield select((state) => state.fonts.activeFonts);
        activeFonts.forEach((font) => {
          fontsGenerate(font.font_id);
        });
        // 4 - Приводим к нужному формату data
        const list = Methods.createDataList(response.data.data);
        if (list) {
          // 5 - Сохраняем в store
          yield put(dataListGetFormatDataSuccess(list));
        }
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(dataListGetError(error.response));
      Notification.onError(error.response);
    }
  }
}

/**
 * @function
 * @name dataPostAddBlockSaga
 * @category Redux saga
 * @description - Добавление блока (data) на страницу
 */
export function* dataPostAddBlockSaga(action) {
  const { id, position, snippet } = action.payload;
  try {
    // 1 - Запрос на бек
    const response = yield call(dataPostAddBlock, id, position);
    if (response) {
      if (response.data.data) {
        const { data } = response.data;
        // 2 - Подгоняем полученную data к формату
        const dataFormatted = yield call(Methods.dataFormation, data);
        if (dataFormatted) {
          // 3 - Получаем всю data сниппета с новым блоком
          const newData = yield call(Methods.addData, dataFormatted, snippet);
          if (newData) {
            // 4 - Записываем новый store
            yield put(dataReplaceAll(newData, snippet));
            // 5 - Запрашиваем новый список блоков
            yield put(blocksListGet());
            yield delay(500);
            // 6 - Снимаем прелоадер
            yield put(dataAddSuccess());
          }
        }
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(dataAddError(error.response));
      Notification.onError(error.response);
    }
  }
}

/**
 * @function
 * @name dataPostDuplicateBlockSaga
 * @category Redux saga
 * @description - Дублирование блока (data) на страницу
 */
export function* dataPostDuplicateBlockSaga(action) {
  const { id, position, snippet } = action.payload;
  try {
    // 1 - Запрос на бек
    const response = yield call(dataPostDuplicateBlock, id, position);
    if (response) {
      const configuration = yield select((state) => state.configuration);
      const isDemo = !!configuration.is_demo;
      // 2 - Проверяем Демо режим
      if (isDemo) {
        const dataFormatted = yield call(Methods.demoDuplicateData, id);
        const newData = yield call(Methods.addData, dataFormatted, snippet);
        if (newData) {
          yield put(dataReplaceAll(newData, snippet));
          yield delay(500);
          yield put(dataDuplicateSuccess(newData, snippet));
        }
      } else {
        // 3 Продолжаем, если не демо
        if (response.data.data) {
          const { data } = response.data;
          // 4 - Подгоняем полученную data к формату
          const dataFormatted = yield call(Methods.dataFormation, data);
          if (dataFormatted) {
            // 5 - Получаем всю data сниппета с новым блоком
            const newData = yield call(Methods.addData, dataFormatted, snippet);
            if (newData) {
              // 6 - Записываем новый store
              yield put(dataReplaceAll(newData, snippet));
              yield delay(500);
              // 7 - Снимаем прелоадер
              yield put(dataDuplicateSuccess(newData, snippet));
            }
          }
        }
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(dataDuplicateError(error.response));
      Notification.onError(error.response);
    }
  }
}

/**
 * @function
 * @name dataPostDeleteBlockSaga
 * @category Redux saga
 * @description - Удаление блока (data) на странице
 */
export function* dataPostDeleteBlockSaga(action) {
  const { id, snippet } = action.payload;
  try {
    // 1 - Запрос на бек
    const response = yield call(dataPostDeleteBlock, id);
    if (response) {
      // 2 - Удаляем блок из store
      const newData = yield call(Methods.deleteData, id, snippet);
      if (newData) {
        // 3 - Записываем новый store
        yield put(dataReplaceAll(newData, snippet));
        // 4 - Запрашиваем новый список блоков
        yield put(blocksListGet());
        yield delay(500);
        // 5 - Снимаем прелоадер
        yield put(dataDeleteSuccess(newData, snippet));
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(dataDuplicateError(error.response));
      Notification.onError(error.response);
    }
  }
}

/**
 * @function
 * @name dataSortableBlockSaga
 * @category Redux saga
 * @description - Сортировка блока (data) в сниппете
 */
export function* dataSortableBlockSaga(action) {
  const { oldIndex, newIndex, snippet } = action.payload;
  try {
    // 1 - Сортировка
    const sortable = yield call(
      Methods.getSortableData,
      oldIndex,
      newIndex,
      snippet,
    );
    if (sortable) {
      // 2 - Запрос на бек
      const response = yield call(
        dataPostSortableBlocks,
        sortable.request.snippet,
        sortable.request.positions,
      );
      if (response) {
        if (sortable.data) {
          // 3 - Записываем в store
          yield put(dataReplaceAll(sortable.data, snippet));
          yield delay(500);
          // 4 - Снимаем прелоадер
          yield put(dataSortableSuccess(sortable.data, snippet));
        }
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(dataSortableError(error.response));
      Notification.onError(error.response);
    }
  }
}

/**
 * @function
 * @name dataUpdateBlockSaga
 * @category Redux saga
 * @description - Обновление data
 */
export function* dataUpdateBlockSaga(action) {
  const { dataID } = action.payload;
  try {
    // 1 - Создаем request
    const data = Methods.getPublishData(dataID);
    if (data) {
      // 2 - Запрос на бек
      const response = yield call(
        dataPostUpdateBlock,
        dataID,
        data.draft,
        data.publish,
      );

      if (response.data && !response.data.success) {
        // 3 - Только в случае ошибки приостанавливаем реакт
      }
    }
  } catch (error) {
    if (error.response) {
      yield Notification.onError(error.response);
      yield put(dataChangeValuesError(error.response));
    }
  }
}

export default function* dataSaga() {
  yield all([
    yield takeEvery(dataTypes.DATA_LIST_GET, dataGetListSaga),
    yield takeEvery(dataTypes.DATA_ADD, dataPostAddBlockSaga),
    yield takeEvery(dataTypes.DATA_DUPLICATE, dataPostDuplicateBlockSaga),
    yield takeEvery(dataTypes.DATA_DELETE, dataPostDeleteBlockSaga),
    yield takeEvery(dataTypes.DATA_SORTABLE, dataSortableBlockSaga),
    yield takeEvery(dataTypes.DATA_VALUES_CHANGE, dataUpdateBlockSaga),
  ]);
}
