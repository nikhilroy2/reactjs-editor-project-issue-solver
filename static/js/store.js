import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
import rootReducer from './redux/reducers';
import rootSaga from './redux/sagas'
import { IS_DEV } from './config';

const sagaMiddleware = createSagaMiddleware();

const initialState = {};

const middleWares = () => {
  if (IS_DEV) {
    return composeWithDevTools(applyMiddleware(sagaMiddleware));
  }
  return applyMiddleware(sagaMiddleware);
};

const store = createStore(
  rootReducer,
  initialState,
  middleWares(),
);

sagaMiddleware.run(rootSaga);

export default store;
