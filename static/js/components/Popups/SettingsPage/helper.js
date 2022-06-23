export const checkEmptyUrl = (values) => {
  if (values.url) {
    return values;
  }

  return {
    ...values,
    url: values.name
      .toLowerCase()
      .trim()
      .replace(/\s+|_+/g, '-'),
  };
};
