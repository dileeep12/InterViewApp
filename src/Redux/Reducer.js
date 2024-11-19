import types from './Constants';

const initialState = {
  name: '',
  getIntro: false,
  getUserData: {},
  getFavourites: [],
  theme: 'light',
};

const ReducerFunction = (state = initialState, action) => {
  switch (action.type) {
    case types.NAME:
      return {...state, name: action.payload};
    case types.INTRO:
      return {...state, getIntro: action.payload};
    case types.USERDATA:
      return {...state, getUserData: action.payload};
    case types.LOGOUT:
      return initialState.getUserData;
    case types.FAVOURITES:
      return {...state, getFavourites: action.payload};
    case types.TOGGLE_THEME:
      return {...state, theme: action.payload};
    default:
      return state;
  }
};

export default ReducerFunction;
