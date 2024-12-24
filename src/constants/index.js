export const host_cms = process.env.NEXT_PUBLIC_HOST_CMS;

export const host_erpskrip = process.env.NEXT_PUBLIC_HOST_GRAHASIP;

export const API_URL_login = `${host_cms}/auth/token/`;
export const API_URL_refreshToken = `${host_cms}/auth/token/refresh/`;

export const API_URL_group = `${host_cms}/auth/group/`;
export const API_URL_permission = `${host_cms}/auth/permission/`;
export const API_URL_permissionlist = `${host_cms}/auth/permissionlist/`;
export const API_URL_user = `${host_cms}/auth/user/`;
export const API_URL_getuser = `${host_cms}/auth/getuser/`;
export const API_URL_contentType = `${host_cms}/auth/contenttype/`;

export const API_URL_dashboard = `${host_cms}/cms/dashboard`;
export const API_URL_artikel = `${host_cms}/cms/artikel`;
export const API_URL_visitor = `${host_cms}/cms/visitor`;
export const API_URL_masterfile = `${host_cms}/cms/masterfile`;

