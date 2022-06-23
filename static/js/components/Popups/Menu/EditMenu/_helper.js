import store from '../../../../store';

export const getPagesList = (addedList = []) => {
  const state = store.getState();

  if (state && state.pages && state.pages.data.length) {
    const pages = [
      {
        label: 'Select page',
        value: 0,
      },
    ];
    const isPublic = state.pages.activePage.public;

    const addPage = (page) => {
      pages.push({
        label: page.name ? page.name : 'Page',
        value: page.id,
      });
    };

    const checkApiPage = addedList.find((item) => (item.name.trim().toLowerCase() === 'api'));

    if (!checkApiPage) {
      addPage({ name: 'API', id: 'api' });
    }

    state.pages.data
      .filter((page) => {
        const findPage = addedList.find((item) => {
          if (item.url.type === 'internal') {
            if (Number(item.url.value) === Number(page.id)) {
              return true;
            }
          }
          return false;
        });
        return !findPage;
      })
      .forEach((page) => {
        if (isPublic && page.public && page.menu && !page.blog) {
          addPage(page);
        } else if (!isPublic && !page.blog) {
          if (page.default_url !== 'services_private' && page.menu) {
            addPage(page);
          }
        }
      });

    if (pages.length === 1) {
      return [];
    }

    return pages;
  }
  return [];
};

export const getActivePage = (value, name) => {
  const state = store.getState();
  if (value && state && state.pages && state.pages.data.length) {
    if (value === 'api') {
      return {
        label: 'API',
        value: 'api',
      };
    }
    if (name.trim().toLowerCase() === 'api') {
      return {
        label: 'API',
        value,
      };
    }

    const findActivePage = state.pages.data.find((page) => Number(page.id) === Number(value));
    if (findActivePage) {
      return {
        label: findActivePage.name ? findActivePage.name : 'Page',
        value: findActivePage.id,
      };
    }
  }
  return {
    label: 'Select page',
    value: 0,
  };
};
