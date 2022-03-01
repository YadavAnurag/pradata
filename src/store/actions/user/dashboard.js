import * as actionTypes from "../actionTypes";
import userDataService from "../../../services/userData.Service";

// setDashboardData
export const setUserDashboardData = (userDashboardData) => {
  return {
    type: actionTypes.SET_USER_DASHBOARD_DATA,
    userDashboardData,
  };
};

export const setAdminDashboardData = (adminDashboardData) => {
  return {
    type: actionTypes.SET_ADMIN_DASHBOARD_DATA,
    adminDashboardData,
  };
};

// get user dashboard data
export const initGetDashboardData = (id, isAdmin) => {
  return async (dispatch) => {
    try {
      const response = await userDataService.getDashboardData(id);
      if (isAdmin) {
        dispatch(setAdminDashboardData(response.data));
      } else {
        dispatch(setUserDashboardData(response.data));
      }

      return Promise.resolve(true);
    } catch (err) {
      return Promise.reject(err);
    }
  };
};
