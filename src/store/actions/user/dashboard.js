import * as actionTypes from "../actionTypes";
import userDataService from "../../../services/userData.Service";

// setDashboardData
export const setDashboardData = (dashboardData) => {
  return {
    type: actionTypes.SET_DASHBOARD_DATA,
    dashboardData,
  };
};

// get user dashboard data
export const initGetDashboardData = ({ id = "" } = {}) => {
  console.log("gonna send dashboard data");
  return async (dispatch) => {
    try {
      const response = await userDataService.getDashboardData(id);

      dispatch(setDashboardData(response.data.dashboardData));
      return Promise.resolve(true);
    } catch (err) {
      return Promise.reject(err);
    }
  };
};
