export const UrlEndPoint = process.env.EXPO_PUBLIC_ENDPOINT_URL;

export const CHECK_USER_IS_EXIST = UrlEndPoint + "/api/user/checkUserIsexisit";

export const CREATE_NEW_USER = UrlEndPoint + "/api/user/registerNewUser";
// For login and get user details
export const USER_LOGIN = UrlEndPoint + "/api/user/login";
export const GET_USER = UrlEndPoint + "/api/user/update";
export const GET_USER_BY_MOBILE = UrlEndPoint + "/api/user/get_by_mobile";
export const UPDATE_USER_PROFILE =
  UrlEndPoint + "/api/user/update/updateprofile";
export const UPDATE_USER_CAR = UrlEndPoint + "/api/user/update/updatecar";
export const GET_ALL_CARS = UrlEndPoint + "/api/cars/getallcars";
export const GET_CARS_BY_ID = UrlEndPoint + "/api/cars/getCarById";
// export const GET_CARS_BY_ID = UrlEndPoint +  "/api/cars/getCarById?carId=66bb31a72b7dbdff6a173032";
export const GROUP_BRANCHES_BY_CITY = UrlEndPoint + "/api/branches/groupcity";

export const BRANCHES_BY_CITY = UrlEndPoint + "/api/branches/getbranchbycity";
export const BRANCHES_DETAIL = UrlEndPoint + "/api/branches/branchdetail"; // params : brid
