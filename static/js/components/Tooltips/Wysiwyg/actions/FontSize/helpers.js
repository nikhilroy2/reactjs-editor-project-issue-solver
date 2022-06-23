import { headersDraftJs } from './constants';

export const getDefaultSize = (currentHeaders, headers, key) => {
  const defaultSize = 14;
  const componentData = headers.data;

  if (currentHeaders && key && headers && headersDraftJs[currentHeaders]) {
    if (componentData[headersDraftJs[currentHeaders]][key]) {
      return parseInt(componentData[headersDraftJs[currentHeaders]][key], 10);
    }
  }

  if (componentData.p && componentData.p[key]) {
    return parseInt(componentData.p[key], 10);
  }

  return defaultSize;
};
