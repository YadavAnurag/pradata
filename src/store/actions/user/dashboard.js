import * as actionTypes from "../actionTypes";
import userDataService from "../../../services/userData.Service";

// setDashboardData
export const setUserDashboardData = (userDashboardData) => {
  console.log("2 Got response ", userDashboardData);
  return {
    type: actionTypes.SET_USER_DASHBOARD_DATA,
    userDashboardData,
  };
};

export const setAdminDashboardData = (adminDashboardData) => {
  console.log("2 Got response ", adminDashboardData);
  return {
    type: actionTypes.SET_ADMIN_DASHBOARD_DATA,
    adminDashboardData,
  };
};

// get user dashboard data
export const initGetDashboardData = (id, isAdmin) => {
  console.log("gonna send dashboard data");
  return async (dispatch) => {
    try {
      const response = await userDataService.getDashboardData(id);
      console.log("1 Got response - ", response.data);
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
