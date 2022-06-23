import axios from 'axios';
import _ from 'lodash';
import parseUrl from 'parse-url';
import { uuid } from 'uuidv4';
import { IS_DEV, DEV_KEY, ADMIN_ID } from '../config';
import { getBaseUrl } from './helper';
import { Q } from './queues';
import store from '../store';
import { preloaderLockedTab } from '../redux/actions/Preloader';

const instance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 15000,
});

instance.interceptors.request.use(
  (config) => {
    const parse = parseUrl(config.url);
    const instanceID = uuid();
    const state = store.getState();

    config.instanceID = instanceID || Math.random();
    Q.push(instanceID, config);
    const { mode } = state.languages;

    if (!parse.resource) {
      const token = localStorage ? localStorage.getItem('token') : false;

      const defaultHeaders = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'X-Editor-Token': state.configuration.editor_token || '',
      };

      const fileHeader = config && config.headers && config.headers['Content-Type'] === 'multipart/form-data';

      config.headers = config.headers ? { ..._.merge(defaultHeaders, config.headers) } : { ...defaultHeaders };

      if (token) {
        // config.headers.Authorization = `Bearer ${token}`
      } else {
        // console.error("Not found Authorization token");
      }

      if (IS_DEV && fileHeader) {
        config.data.append('key', DEV_KEY);
        config.data.append('admin_id', ADMIN_ID);
      } else {
        if ((config.params && IS_DEV) || (config.method === 'get' && IS_DEV)) {
          config.params = {};
          config.params.key = DEV_KEY;
          config.params.admin_id = ADMIN_ID;
        }

        if (config.data && IS_DEV) {
          config.data.key = DEV_KEY;
          config.data.admin_id = ADMIN_ID;
        }
      }

      // Если включен режим перевода, к каждому запросу добавляем код языка
      if (mode) {
        if (!config.params) {
          config.params = {};
        }
        config.params.lang = mode;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => {
    const { instanceID } = response.config;
    Q.success(instanceID);
    return response;
  },
  (error) => {
    /* Logout */
    if (error && error.response && error.response.status === 401) {
      document.location.reload();
    }

    /* new_version_available_now */
    if (error && error.response && error.response.status === 418) {
      window.location.replace(`${window.location.origin}/admin/logout`);
    }

    /* Conflict tabs */
    if (error && error.response && error.response.status === 409) {
      store.dispatch(preloaderLockedTab());
    }
    return Promise.reject(error);
  },
);

export default instance;
