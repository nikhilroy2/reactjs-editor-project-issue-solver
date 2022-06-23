import { all } from 'redux-saga/effects';

import { preloaderActionWatcher } from './preloader';
import dataSagas from './data';
import deps from './deps';
import filesmanager from './filesmanager';
import pages from './pages';
import tests from './tests';
import blocks from './blocks';
import styles from './styles';
import languages from './languages';
import fonts from './fonts';
import colors from './colors';
import components from './components';
import publish from './publish';
import configuration from './configuration';

export default function* rootSaga() {
  yield all([
    preloaderActionWatcher(),
    dataSagas(),
    deps(),
    filesmanager(),
    pages(),
    tests(),
    blocks(),
    styles(),
    languages(),
    fonts(),
    colors(),
    components(),
    publish(),
    configuration(),
  ]);
}
