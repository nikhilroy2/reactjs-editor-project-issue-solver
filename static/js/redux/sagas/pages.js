import {
  all, call, put, takeEvery, delay,
} from 'redux-saga/effects';
import * as pageTypes from '../types/pages';
import {
  pagesGetList, addPage, deletePage, updatePage, addBlogPage, deleteBlogPage,
} from '../../services/urls/editor/pages';
import {
  pagesGetListSuccess,
  pagesGetListError,
  pagesAddActivePage,
  pagesAddPageSuccess,
  pagesAddPageError,
  pagesAddBlogPageSuccess,
  pagesAddBlogPageError,
  pagesDeleteBlogPageSuccess,
  pagesDeleteBlogPageError,
  pagesDeletePageSuccess,
  pagesDeletePageError,
  pagesUpdatePageSuccess,
  pagesUpdatePageError,
  switchPageMode,
  filterEmptyPage,
} from '../actions/Pages';

import store from '../../store';
import { history } from '../../history';
import { EDITOR_URL } from '../../config';

/**
 * @function
 * @name pagesGetListSaga
 * @category Redux saga
 * @description saga список страниц
 */
export function* pagesGetListSaga(action) {
  const pageID = action.payload.id;
  try {
    const response = yield call(pagesGetList, null);
    if (response) {
      if (response.data.data) {
        const activePage = yield response.data.data.find((page) => Number(page.id) === Number(pageID));
        if (activePage) {
          yield put(pagesAddActivePage(activePage));
        }
        yield put(pagesGetListSuccess(response.data.data));
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(pagesGetListError(error.response));
    }
  }
}

/**
 * @function
 * @name pagesAddPageSaga
 * @category Redux saga
 * @description saga создание страницы
 */
export function* pagesAddPageSaga(action) {
  try {
    const response = yield call(addPage, action.payload.data);
    if (response) {
      const newPage = response.data.data;

      yield put(pagesAddPageSuccess(newPage));
      yield put(switchPageMode({ isEdit: false, activeIdPage: newPage.id }));
      yield put(filterEmptyPage());
      action.payload.onClose(false);
    }
  } catch (error) {
    if (error.response) {
      yield put(pagesAddPageError(error.response));
    }
  }
}

/**
 * @function
 * @name pagesUpdatePageSaga
 * @category Redux saga
 * @description saga обновление страницы
 */
export function* pagesUpdatePageSaga(action) {
  const { data } = action.payload;
  const { id } = action.payload;

  try {
    const response = yield call(updatePage, id, data);
    if (response) {
      const updatedPage = response.data.data;
      const state = store.getState();

      const updatePages = state.pages.data.map((page) => {
        if (page.id === id) {
          return {
            ...page,
            ...updatedPage,
          };
        }

        return page;
      });
      yield put(pagesUpdatePageSuccess(updatePages));
      action.payload.onClose(false);
    }
  } catch (error) {
    if (error.response) {
      yield put(pagesUpdatePageError(error.response));
    }
  }
}

/**
 * @function
 * @name pagesAddBlogPageSaga
 * @category Redux saga
 * @description saga создание страницы
 */
export function* pagesAddBlogPageSaga(action) {
  try {
    const response = yield call(addBlogPage, action.payload.data);
    if (response) {
      const newPage = response.data.data;

      yield put(pagesAddBlogPageSuccess(newPage));
      if (action.payload.data.redirect) {
        yield history.push(`/admin/editor/${newPage.id}`)
      }
      yield put(switchPageMode({ isEdit: false, activeIdPage: newPage.id }));
      yield put(filterEmptyPage());
      yield delay(1000);
      action.payload.onClose(false);
    }
  } catch (error) {
    if (error.response) {
      yield put(pagesAddBlogPageError(error.response));
    }
  }
}

/**
 * @function
 * @name pagesDeletePageSaga
 * @category Redux saga
 * @description saga удаление страницы
 */
export function* pagesDeletePageSaga(action) {
  const pageId = action.payload.id;
  const { urlId } = action.payload;

  try {
    const response = yield call(deletePage, pageId);
    if (response) {
      const state = store.getState();
      const newPages = state.pages.data.filter((page) => Number(page.id) !== Number(pageId));
      yield put(pagesDeletePageSuccess(newPages));

      if (pageId === urlId) {
        yield put(history.push(`${EDITOR_URL}/`));
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(pagesDeletePageError(error.response));
    }
  }
}

/**
 * @function
 * @name pagesDeleteBlogPageSaga
 * @category Redux saga
 * @description saga удаление страницы
 */
export function* pagesDeleteBlogPageSaga(action) {
  const pageId = action.payload.id;
  const { urlId } = action.payload;

  try {
    const response = yield call(deleteBlogPage, pageId);
    if (response) {
      const state = store.getState();
      const newPages = state.pages.data.filter((page) => Number(page.id) !== Number(pageId));
      yield put(pagesDeleteBlogPageSuccess(newPages));

      if (pageId === urlId) {
        yield put(history.push(`${EDITOR_URL}/`));
      }
    }
  } catch (error) {
    if (error.response) {
      yield put(pagesDeleteBlogPageError(error.response));
    }
  }
}

export default function* dataSaga() {
  yield all([
    yield takeEvery(pageTypes.PAGES_GET_LIST, pagesGetListSaga),
    yield takeEvery(pageTypes.PAGES_ADD_PAGE, pagesAddPageSaga),
    yield takeEvery(pageTypes.PAGES_DELETE_PAGE, pagesDeletePageSaga),
    yield takeEvery(pageTypes.PAGES_ADD_BLOG_PAGE, pagesAddBlogPageSaga),
    yield takeEvery(pageTypes.PAGES_DELETE_BLOG_PAGE, pagesDeleteBlogPageSaga),
    yield takeEvery(pageTypes.PAGES_UPDATE_PAGE, pagesUpdatePageSaga),
  ]);
}
