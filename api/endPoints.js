export const UrlEndPoint = process.env.EXPO_PUBLIC_ENDPOINT_URL;

export const CHECK_USER_IS_EXIST = UrlEndPoint + "/api/user/checkUserIsexisit";

export const CREATE_NEW_USER = UrlEndPoint + "/api/user/registerNewUser";
// For login and get user details
export const USER_LOGIN = UrlEndPoint + "/api/user/login";
export const GET_USER = UrlEndPoint + "/api/user/update";
export const GET_USER_BY_MOBILE = UrlEndPoint + "/api/user/get_by_mobile";
export const UPDATE_USER_PROFILE =
  UrlEndPoint + "/api/user/update/updateprofile";
