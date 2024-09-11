import types from './Constants';

const initialState = {
  name: '',
  getIntro: false,
  getUserData: {},
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
    default:
      return state;
  }
};

export default ReducerFunction;
