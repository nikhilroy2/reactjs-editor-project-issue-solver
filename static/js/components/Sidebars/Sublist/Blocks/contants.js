export const dragSnippets = [
  {
    node: '.drag-navbar',
    connectToSortable: '#editor-wrapper-content-navbar',
  },
  {
    node: '.drag-navbar-drag-header',
    connectToSortable: '#editor-wrapper-content-navbar, #editor-wrapper-content-header',
  },
  {
    node: '.drag-navbar-drag-header-drag-page',
    connectToSortable: '#editor-wrapper-content-navbar, #editor-wrapper-content-header, #editor-wrapper-content-page',
  },
  {
    node: '.drag-navbar-drag-header-drag-page-drag-footer',
    connectToSortable: '#editor-wrapper-content-navbar, #editor-wrapper-content-header, #editor-wrapper-content-page, #editor-wrapper-content-footer',
  },
  {
    node: '.drag-header',
    connectToSortable: '#editor-wrapper-content-header',
  },
  {
    node: '.drag-header-drag-page',
    connectToSortable: '#editor-wrapper-content-header, #editor-wrapper-content-page',
  },
  {
    node: '.drag-header-drag-page-drag-footer',
    connectToSortable: '#editor-wrapper-content-header, #editor-wrapper-content-page, #editor-wrapper-content-footer',
  },
  {
    node: '.drag-page',
    connectToSortable: '#editor-wrapper-content-page',
  },
  {
    node: '.drag-page-drag-footer',
    connectToSortable: '#editor-wrapper-content-page, #editor-wrapper-content-footer',
  },
  {
    node: '.drag-footer',
    connectToSortable: '#editor-wrapper-content-footer',
  },
];
