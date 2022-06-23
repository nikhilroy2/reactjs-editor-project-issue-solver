import {
  all, put, take, takeEvery, cancel, select, spawn, delay,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as preloaderTypes from '../types/preloader';

import { pagesGetList } from '../actions/Pages';
import { setProgress, preloaderSuccess } from '../actions/Preloader';
import { blocksListGet } from '../actions/Blocks';
import { dataListGet, dataListGetFormatData } from '../actions/data/list';
import { stylesListGet } from '../actions/Styles';
import { fontsListGet, fontsActiveGet } from '../actions/Fonts';
import { colorsListGet } from '../actions/Colors';
import { componentsListGet } from '../actions/Components';
import { languagesGetList, languagesTranslationsGet, languagesAllList } from '../actions/Languages';
import { filesManagerList } from '../actions/FilesManager';
import { configurationListGet } from '../actions/Configuration';

import * as pagesTypes from '../types/pages';
import * as dataTypes from '../types/data';
import * as blocksTypes from '../types/blocks';
import * as componentsTypes from '../types/components';
import * as stylesTypes from '../types/styles';
import * as languagesTypes from '../types/languages';
import * as fontsTypes from '../types/fonts';
import * as colorsTypes from '../types/colors';
import * as filesManagerTypes from '../types/filesmanager';
import * as configurationTypes from '../types/configuration';

/**
 * @function
 * @name getAllData
 * @category Redux saga
 * @description Получения всех листингов, конфигурация, перед тем как снять прелоадер
 */
export function* getAllData(action) {
  yield put(configurationListGet());
  yield take(configurationTypes.CONFIGURATION_LIST_GET_SUCCESS);

  const pageID = action.payload && action.payload.id ? action.payload.id : false;
  const requiredSagas = [
    {
      title: 'Pages list',
      action: pagesGetList,
      success: pagesTypes.PAGES_GET_LIST_SUCCESS,
      error: pagesTypes.PAGES_GET_LIST_ERROR,
    },
    {
      title: 'Data list',
      action: dataListGet,
      success: dataTypes.DATA_LIST_GET_SUCCESS,
      error: dataTypes.DATA_LIST_GET_ERROR,
    },
    {
      title: 'Blocks list',
      action: blocksListGet,
      success: blocksTypes.BLOCKS_LIST_GET_SUCCESS,
      error: blocksTypes.BLOCKS_LIST_GET_ERROR,
    },
    {
      title: 'Styles list',
      action: stylesListGet,
      success: stylesTypes.STYLES_LIST_GET_SUCCESS,
      error: stylesTypes.STYLES_LIST_GET_ERROR,
    },
    {
      title: 'Components list',
      action: componentsListGet,
      success: componentsTypes.COMPONENTS_LIST_GET_SUCCESS,
      error: componentsTypes.COMPONENTS_LIST_GET_ERROR,
    },
    {
      title: 'Added languages list',
      action: languagesGetList,
      success: languagesTypes.LANGUAGES_LIST_GET_SUCCESS,
      error: languagesTypes.LANGUAGES_LIST_GET_ERROR,
    },
    {
      title: 'Languages list',
      action: languagesAllList,
      success: languagesTypes.LANGUAGES_ALL_LIST_SUCCESS,
      error: languagesTypes.LANGUAGES_ALL_LIST_ERROR,
    },
    {
      title: 'Languages translations',
      action: languagesTranslationsGet,
      success: languagesTypes.LANGUAGES_TRANSLATIONS_GET_SUCCESS,
      error: languagesTypes.LANGUAGES_TRANSLATIONS_GET_ERROR,
    },
    {
      title: 'Fonts list',
      action: fontsListGet,
      success: fontsTypes.FONTS_LIST_GET_SUCCESS,
      error: fontsTypes.FONTS_LIST_GET_ERROR,
    },
    {
      title: 'Fonts active list',
      action: fontsActiveGet,
      success: fontsTypes.FONTS_ACTIVE_GET_SUCCESS,
      error: fontsTypes.FONTS_ACTIVE_GET_ERROR,
    },
    {
      title: 'Colors list',
      action: colorsListGet,
      success: colorsTypes.COLORS_LIST_GET_SUCCESS,
      error: colorsTypes.COLORS_LIST_GET_ERROR,
    },
    {
      title: 'Files Manager list',
      action: filesManagerList,
      success: filesManagerTypes.FILES_MANAGER_LIST_SUCCESS,
      error: filesManagerTypes.FILES_MANAGER_LIST_ERROR,
    },
  ];

  let counter = 0;
  let errorToast = false;

  yield all(
    // eslint-disable-next-line
    requiredSagas.map((saga) => spawn(function* () {
      yield put(saga.action(pageID));
      while (true) {
        try {
          const action = yield take([saga.success, saga.error]);
          const { isLoading } = yield select((state) => state.preloader);
          if (!isLoading) {
            yield cancel();
          }
          if (action.type === saga.success) {
            counter++;
            const progress = ((counter / requiredSagas.length) * 100).toFixed(0);
            yield put(setProgress(progress));
            if (counter === requiredSagas.length) {
              yield delay(500);
              yield put(dataListGetFormatData());
              yield take(dataTypes.DATA_LIST_FORMAT_DATA_SUCCESS);
              yield put(preloaderSuccess());
            }
          }

          if (action.type === saga.error) {
            if (!errorToast) {
              errorToast = toast.error(`${saga.title} error`, {
                autoClose: false,
                pauseOnHover: false,
                pauseOnFocusLoss: false,
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            } else {
              yield delay(2000);
              toast.update(errorToast, {
                type: toast.TYPE.WARNING,
                autoClose: 7000,
                // eslint-disable-next-line
                  onClose: function() {
                  errorToast = false;
                },
                render: `Reboot in 10 seconds... (${requiredSagas.length - counter})`,
              });
            }
            yield delay(10000);
            new Error('Request error');
            yield put(saga.action(pageID));
          }
        } catch (e) {
          console.log(e);
        }
      }
    })),
  );
}

export function* preloaderActionWatcher() {
  yield takeEvery(preloaderTypes.PRELOADER, getAllData);
}
