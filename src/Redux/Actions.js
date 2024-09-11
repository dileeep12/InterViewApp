import types from './Constants';

export const setName = data => {
  return {
    type: types.NAME,
    payload: data,
  };
};
export const setIntro = data => {
  return {
    type: types.INTRO,
    payload: data,
  };
};
export const setUserData = data => {
  return {
    type: types.USERDATA,
    payload: data,
  };
};
export const setLogout=()=>{
  return {
    type:types.LOGOUT
  }
}