export const getActiveTab = (type) => {
  let activeTab;

  switch (type) {
    case 'page':
      activeTab = { width: '100px', tab: 0 };
      break;
    case 'web':
      activeTab = { width: '92px', tab: 1 };
      break;
    case 'anchor':
      activeTab = { width: '83px', tab: 2 };
      break;
    default:
      activeTab = { width: '92px', tab: 1 };
      break;
  }

  return activeTab;
};

export const getPagesToOptions = (pages, activePage) => {
  const isPublic = !!activePage.public;

  let list = [
    {
      value: 0,
      label: 'Select page',
    },
  ];
  if (pages && pages.length) {
    list = pages
      .filter((item) => {
        if (isPublic) {
          return isPublic === item.public;
        }
        return true;
      })
      .map((item) => ({
        value: item.default_url,
        label: item.name,
      }));
    list.unshift({
      value: 0,
      label: 'Select page',
    });
  }
  return list;
};

export const getBlocksToOptions = (blocks) => {
  const list = [
    {
      value: 0,
      label: 'Select block',
    },
  ];

  const sortCompare = (a, b) => {
    const bandA = a.position;
    const bandB = b.position;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  };

  if (blocks) {
    Object.values(blocks).forEach((snippet) => {
      if (Object.values(snippet).length) {
        Object.values(snippet)
          .sort(sortCompare)
          .forEach((data) => {
            list.push({
              value: data.id,
              label: data.title,
            });
          });
      }
    });
  }
  return list;
};
