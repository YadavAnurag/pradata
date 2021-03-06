import * as actionTypes from "../../actions/actionTypes";

// set users
const setUserDashboardData = (state, action) => {
  return [...state, ...action.userDashboardData];
};

// dashboard reducer
const userDashboardDataDefaultState = [];
export const userDashboardReducer = (
  state = userDashboardDataDefaultState,
  action
) => {
  switch (action.type) {
    case actionTypes.SET_USER_DASHBOARD_DATA:
      return setUserDashboardData(state, action);
    default:
      return state;
  }
};

// set admin
const setAdminDashboardData = (state, action) => {
  return { ...state, ...action.adminDashboardData };
};

// admin dashboard reducer
const adminDashboardDataDefaultState = {};
export const adminDashboardReducer = (
  state = adminDashboardDataDefaultState,
  action
) => {
  switch (action.type) {
    case actionTypes.SET_ADMIN_DASHBOARD_DATA:
      return setAdminDashboardData(state, action);
    default:
      return state;
  }
};
