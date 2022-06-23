export const { NODE_ENV } = process.env;
export const IS_DEV = NODE_ENV === 'development';
export const DEV_KEY = 'qrt54f7j87fvx5o7g43eyf78dher7g92';
export const DEV_DOMAIN = 'mypanel.dev';
export const ADMIN_ID = process.env.ADMIN_ID ? process.env.ADMIN_ID : '1';
export const EDITOR_URL = '/admin/editor';
export const DEV_PANELS = [
  'mypanel.dev'
];
