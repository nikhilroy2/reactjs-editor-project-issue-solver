import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'proxy-polyfill';
import 'intersection-observer';

import 'core-js/features/function';
import 'core-js/features/array/find';
import 'core-js/features/array/includes';
import 'core-js/features/map';
import 'core-js/features/set';

if (global.window && global.window.Element) {
  // eslint-disable-next-line
  global.window.Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
  };
}
if (global.window && global.window.NodeList) {
  // eslint-disable-next-line
  global.window.NodeList.prototype.remove = global.window.HTMLCollection.prototype.remove = function () {
    for (let i = this.length - 1; i >= 0; i--) {
      if (this[i] && this[i].parentElement) {
        this[i].parentElement.removeChild(this[i]);
      }
    }
  };
}
