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
export const setLogout = () => {
  return {
    type: types.LOGOUT,
  };
};
export const setFav = data => {
  return {
    type: types.FAVOURITES,
    payload: data,
  };
};
export const toggleTheme = data => {
  return {
    type: types.TOGGLE_THEME,
    payload: data,
  };
};
