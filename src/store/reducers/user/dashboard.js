import * as actionTypes from "../../actions/actionTypes";

// set users
const setDashboardData = (state, action) => {
  return {
    ...state,
    data: action.data,
  };
};

// user reducer
const dashboardDataDefaultState = {};
export const dashboardReducer = (state = dashboardDataDefaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_DASHBOARD_DATA:
      return setDashboardData(state, action);
    default:
      return state;
  }
};
