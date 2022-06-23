import { combineReducers } from 'redux';
import navbar from './navbar';
import header from './header';
import page from './page';
import footer from './footer';
import isLoading from './isLoading';

export default combineReducers({
  isLoading,
  blocks: combineReducers({
    navbar,
    header,
    page,
    footer,
  }),
});
