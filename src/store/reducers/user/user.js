import * as actionTypes from "../../actions/actionTypes";
// import { users } from "../../../fixtures/data";

const addUser = (state, action) => {
  return [...state, action.user];
};
const editUser = (state, action) => {
  return state.map((user) => {
    if (user.id === action.id) {
      return { ...user, ...action.updates };
    } else {
      return user;
    }
  });
};
const removeUser = (state, action) => {
  return state.filter(({ id }) => id !== action.id);
};

const addUsage = (state, action) => {
  return state.map((user) => {
    if (user.id === action.userId) {
      return { ...user, usages: user.usages.concat(action.usage) };
    } else return user;
  });
};
const addPayment = (state, action) => {
  return state.map((user) => {
    if (user.id === action.userId) {
      const updatedUsages = user.usages.map((usage) => {
        if (usage.id === action.usageId) {
          return {
            ...usage,
            paymentDetails: usage.paymentDetails.concat(action.paymentDetail),
          };
        } else return usage;
      });

      return { ...user, usages: updatedUsages };
    } else return user;
  });
};

// set users
const setUsers = (state, action) => {
  return action.users;
};

// user reducer
const userReducerDefaultState = new Array();
// const userReducerDefaultState = new Array(...users);
export const userReducer = (state = userReducerDefaultState, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER:
      return addUser(state, action);
    case actionTypes.EDIT_USER:
      return editUser(state, action);
    case actionTypes.REMOVE_USER:
      return removeUser(state, action);

    case actionTypes.ADD_USAGE:
      return addUsage(state, action);

    case actionTypes.ADD_PAYMENT:
      return addPayment(state, action);

    case actionTypes.SET_USERS:
      return setUsers(state, action);
    default:
      return state;
  }
};
