import { combineReducers } from 'redux';
import blocks from './blocks';
import data from './data';
import styles from './styles';
import preloader from './preloader';
import pages from './pages';
import filesmanager from './filesmanager';
import colors from './colors';
import components from './components';
import block from './block';
import languages from './languages';
import colorPicker from './colorpicker';
import sidebar from './sidebar';
import fonts from './fonts';
import publish from './publish';
import configuration from './configuration';

export default combineReducers({
  preloader,
  pages,
  filesmanager,
  colors,
  blocks,
  data,
  styles,
  components,
  block,
  languages,
  colorPicker,
  sidebar,
  fonts,
  publish,
  configuration,
});
