export const getPageMinHeight = (isOpenSidebarBlocks) => {
  if (isOpenSidebarBlocks) {
    const footer = document.getElementsByClassName('wrapper-content__footer')[0];
    const navbar = document.getElementsByClassName('component-navbar')[0];
    const navbar_empty = document.getElementsByClassName('editor-wrapper-content-navbar-empty')[0];
    const footer_empty = document.getElementsByClassName('editor-wrapper-content-footer-empty')[0];
    const body = document.getElementsByTagName('body')[0];

    let minHeight = 0;

    if (body && body.offsetHeight) {
      minHeight = body.offsetHeight;
    }

    if (navbar && navbar.offsetHeight) {
      minHeight -= navbar.offsetHeight;
    }

    if (navbar_empty) {
      minHeight -= 100;
    }

    if (footer_empty) {
      minHeight -= 100;
    }

    if (footer && footer.offsetHeight) {
      minHeight -= footer.offsetHeight;
    }

    if (minHeight) {
      return minHeight;
    }
  }
  return '100vh';
};
