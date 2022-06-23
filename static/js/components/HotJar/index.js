import { useEffect } from 'react';
import parseUrl from 'parse-url';
import { IS_DEV, DEV_PANELS } from '../../config';

/**
 * Hotjar
 *
 * @component
 * @category Components
 * @subcategory HotJar
 *
 */
const HotJar = () => {
  const hotjar = () => {
    // eslint-disable-next-line
    (function (h, o, t, j, a, r) {
      h.hj = h.hj
        // eslint-disable-next-line
        || function () {
          (h.hj.q = h.hj.q || []).push(arguments);
        };
      h._hjSettings = { hjid: 1982996, hjsv: 6 };
      a = o.getElementsByTagName('head')[0];
      r = o.createElement('script');
      r.async = 1;
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      a.appendChild(r);
    }(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv='));
  };

  useEffect(() => {
    const locationHref = window && window.location && window.location.href ? window.location.href : false;
    if (!IS_DEV && locationHref) {
      const parse = parseUrl(locationHref);
      if (parse.resource && !DEV_PANELS.includes(parse.resource)) {
        hotjar();
      }
    }
  }, []);

  return null;
};

HotJar.propTypes = {};

HotJar.defaultProps = {};

export default HotJar;
