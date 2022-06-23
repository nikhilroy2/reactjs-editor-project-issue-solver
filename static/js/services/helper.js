import parseUrl from 'parse-url';
import _ from 'lodash';
import { history } from '../history';
import { IS_DEV, DEV_DOMAIN } from '../config';
import {
  blogUpdateTitle, blogUpdatePreview, blogUpdateContent, blogUpdateQuantityPerPage, blogGetPostsList,
} from './urls/deps/blogposts';

export const getPageID = () => {
  const { pathname } = history.location;
  const split = pathname.split('/');
  return split[split.length - 1];
};

export const getUrl = (url, params) => {
  if (url) {
    const regExp = /\{.*?\}/gi;
    let newURL = url;

    if (params && Object.keys(params).length) {
      const regExpMatch = url.match(regExp);

      if (regExpMatch.length) {
        regExpMatch.forEach((item) => {
          Object.keys(params).forEach((paramKey) => {
            const value = params[paramKey];

            if (paramKey === 'page_id') {
              if (item.indexOf(paramKey) !== -1) {
                const pageID = getPageID();
                newURL = newURL.replace(regExp, pageID);
              }
            } else if (item.indexOf(paramKey) !== -1) {
              newURL = newURL.replace(item, value);
            }
          });
        });
      }
    } else if (newURL.indexOf('page_id') !== -1) {
      const pageID = getPageID();
      newURL = newURL.replace(regExp, pageID);
    }

    return newURL;
  }
  return new Error('Param: {url} => cannot be empty');
};

export const getBaseUrl = () => {
  if (IS_DEV) {
    return `https://${DEV_DOMAIN}`;
  }
  const { host } = window.location;
  const { protocol } = window.location;

  const parsed = parseUrl(host);

  if (parsed.resource) {
    return `${protocol}//${parsed.resource}`;
  }
  return `${protocol}//${host}`;
};

export const errorsIgnore = [
  'Network request failed',
  'Failed to fetch',
  'NetworkError',
  'withrealtime/messaging',
  'ResizeObserver loop limit exceeded',
  'ResizeObserver loop completed with undelivered notifications',
  'Non-Error promise rejection captured with keys: [object has no keys]',
  "Cannot read property '_avast_submit' of undefined",
  "null is not an object (evaluating 'n.title')",
  // Random plugins/extensions
  'top.GLOBALS',
  // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
  'originalCreateNotification',
  'canvas.contentDocument',
  'MyApp_RemoveAllHighlights',
  'http://tt.epicplay.com',
  "Can't find variable: ZiteReader",
  'jigsaw is not defined',
  'ComboSearch is not defined',
  'http://loading.retry.widdit.com/',
  'atomicFindClose',
  // Facebook borked
  'fb_xd_fragment',
  // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to
  // reduce this. (thanks @acdha)
  // See http://stackoverflow.com/questions/4113268
  'bmi_SafeAddOnload',
  'EBCallBackMessageReceived',
  // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
  'conduitPage',
  'grecaptcha is not defined',
  /ztePageScrollModule/,
  /feedConf/,
  /snapchat.com/,
  /myGloFrameList/,
  /SecurityError/,
  /Error: AccessDeny/,
  /event is not defined/,
  /anonymous function: captureException/,
  /Blocked a frame with origin/,
];

export const notAllowUrls = [
  // Facebook flakiness
  /graph\.facebook\.com/i,
  // Facebook blocked
  /connect\.facebook\.net\/en_US\/all\.js/i,
  // Woopra flakiness
  /eatdifferent\.com\.woopra-ns\.com/i,
  /static\.woopra\.com\/js\/woopra\.js/i,
  // Chrome extensions
  /extensions\//i,
  /^chrome:\/\//i,
  // Other plugins
  /127\.0\.0\.1:4001\/isrunning/i, // Cacaoweb
  /webappstoolbarba\.texthelp\.com\//i,
  /metrics\.itunes\.apple\.com\.edgesuite\.net\//i,
];

export const getQueryInstance = (query) => {
  if (query) {
    if (query.hasOwnProperty('service') && _.isString(query.service)) {
      const { service } = query;
      switch (service) {
        case 'blog_post_title':
          return blogUpdateTitle;
        case 'blog_post_content':
          return blogUpdateContent;
        case 'blog_post_preview':
          return blogUpdatePreview;
        case 'blog_settings_per_page':
          return blogUpdateQuantityPerPage;
        case 'blog_get_posts':
          return blogGetPostsList;
        default:
          console.error('Not found query instance');
          return false;
      }
    }
  }
  return false;
};
