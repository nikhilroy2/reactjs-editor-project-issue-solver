export const getUrlId = (url) => parseInt(url.match(/(\d+)$/)[0], 10);

export const slicePageName = (isHome, pageName) => {
  const pageNameLength = pageName.length;

  if (isHome && pageNameLength > 16) {
    return `${pageName.slice(0, 16)}...`;
  } if (!isHome && pageNameLength > 22) {
    return `${pageName.slice(0, 22)}...`;
  }
  return pageName;
};
