export const PIXABAY_SETTINGS = {
  url: 'https://pixabay.com/api',
  key: '12628428-fe5491ffb5f3155db2fa46917',
  text: 'Social media',
  page: 1,
  perPage: 90,
  imageTypes: [
    {
      name: 'Photos',
      value: 'photo',
    },
    {
      name: 'Vector graphics',
      value: 'vector',
    },
    {
      name: 'Illustrations',
      value: 'illustration',
    },
  ],
};

export const IS_EXTERNAL_URL = (url) => /pixabay/.test(url);

export const tabs = [
  {
    name: 'Uploaded',
    tab: 0,
    width: '98px',
  },
  {
    name: 'Pixabay',
    tab: 1,
    width: '90px',
  },
];
