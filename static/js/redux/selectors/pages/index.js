import { createSelector } from 'reselect';

const pagesSelector = (state) => state.pages;
export const mapPagesSelector = createSelector(
  [pagesSelector], (pages) => {
    const {
      isFetching, data, activePage, error, errorResponseText,
    } = pages;
    const { isEdit, activeIdPage } = pages.pageMode;

    const pagesPublic = data.filter((item) => item.public && !item.blog).sort((first, second) => first.id - second.id);
    const pagesInternal = data.filter((item) => !item.public && !item.blog).sort((first, second) => first.id - second.id);
    const pagesBlog = data.filter((item) => item.blog).sort((first, second) => first.id - second.id);
    const titles = ['Public', 'Internal', 'Blog'];
    return {
      isFetching,
      pagesPublic,
      pagesInternal,
      pagesBlog,
      titles,
      activePage,
      isEdit,
      activeIdPage,
      error,
      errorResponseText,
    }
  },
);
