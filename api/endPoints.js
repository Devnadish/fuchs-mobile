export const endPoint = process.env.EXPO_PUBLIC_ENDPOINT_URL;

export const CHECK_USER_IS_EXIST = endPoint + "/user/checkUserIsexisit";
export const CREATE_NEW_USER = endPoint + "/user/registerNewUser";
export const USER_LOGIN = endPoint + "/user/login";
export const GET_USER = endPoint + "/user/update";
export const GET_USER_BY_MOBILE = endPoint + "/user/get_by_mobile";
export const UPDATE_USER_PROFILE = endPoint + "/user/update/updateprofile";
export const UPDATE_USER_CAR = endPoint + "/user/update/updatecar";
export const GET_ALL_CARS = endPoint + "/cars/getallcars";
export const GET_CARS_BY_ID = endPoint + "/cars/getCarById";
export const GROUP_BRANCHES_BY_CITY = endPoint + "/branches/groupcity";
export const BRANCHES_BY_CITY = endPoint + "/branches/getbranchbycity";
export const BRANCHES_DETAIL = endPoint + "/branches/branchdetail"; // params : brid
export const OFFERS_DETAIL = endPoint + "/offer/alloffer"; // params : brid
export const GET_ALL_SERVICES = endPoint + "/service/getallservice?language=ar";
export const GET_SERVICES_INFO = endPoint + "/service/serviceinfo";
export const SERVICES_GIFT = endPoint + "/service/servicegift";
export const SERVICES_RATE = endPoint + "/service/servicerate"; //params : serviceId ,page ,limit ,rate
export const UPDATE_PROFILE_IMAGE =
  endPoint + "/user/update/updateUserProfileImage";
export const UPDATE_PROFILE = endPoint + "/user/update/updateUserProfile";
export const GET_ALL_CITY = endPoint + "/city/getallcity";
export const UPDATE_CITY = endPoint + "/city/updatecity";
export const UPDATE_USER_SETTINGS = endPoint + "/user/update/updateUserStting";
export const FAVORITE_BRANCHES = endPoint + "/branches/favorate";
export const BRANCHES_COUNTER = endPoint + "/branches/getCounters"; //params : userId ,cityId
