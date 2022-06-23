export const getButtonAddName = (type = null) => {
  switch (type) {
    case 'pagesPublic':
      return 'Add new public page';
    case 'pagesInternal':
      return 'Add new internal page';
    case 'pagesBlog':
      return 'Add new post';
    default:
      return 'Add new Public page';
  }
};

export const getPageType = (type = 'pagesPublic') => {
  switch (type) {
    case 'pagesPublic':
      return 'public';
    case 'pagesInternal':
      return 'internal';
    case 'pagesBlog':
      return 'blog';
    default:
      return 'public';
  }
};
