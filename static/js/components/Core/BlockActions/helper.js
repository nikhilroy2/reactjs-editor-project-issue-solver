import _ from 'lodash';

export const getAccessActions = (settings) => {
  const isEvenOneAccess = (access) => {
    if (access) {
      let isOne = false;
      for (const key in access) {
        if (access.hasOwnProperty(key)) {
          if (access[key]) {
            isOne = true;
            break;
          }
        }
      }
      if (isOne) {
        return true;
      }
    }
    return false;
  };

  if (settings) {
    if (settings.access) {
      const accessObject = {
        structure: false,
        background: false,
        sortable: false,
        duplicate: false,
        delete: false,
      };

      if (_.isObject(settings.access)) {
        const { access } = settings;
        for (const key in access) {
          if (access.hasOwnProperty(key)) {
            accessObject[key] = access[key];
          }
        }

        if (isEvenOneAccess(accessObject)) {
          return accessObject;
        }
      }
    }
  }
  return false;
};
