import * as actionTypes from "../../actions/actionTypes";

const editConnect = (state, action) => {
  return { ...state, ...action.updates };
};

// set connect
const setConnect = (state, action) => {
  return action.connect;
};

// connect reducer
const connectReducerDefaultState = {};
export const connectReducer = (state = connectReducerDefaultState, action) => {
  switch (action.type) {
    case actionTypes.EDIT_CONNECT:
      return editConnect(state, action);
    case actionTypes.SET_CONNECT:
      return setConnect(state, action);
    default:
      return state;
  }
};
