import * as testsTypes from '../types/tests';

export const testsPages = () => ({
  type: testsTypes.TESTS_GET,
  payload: null,
});

export const testsPagesSuccess = (data) => ({
  type: testsTypes.TESTS_GET_SUCCESS,
  payload: {
    data,
  },
});

export const testsPagesError = (data) => ({
  type: testsTypes.TESTS_GET_ERROR,
  payload: {
    data,
  },
});
