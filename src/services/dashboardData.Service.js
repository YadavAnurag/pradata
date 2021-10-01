import axiosCommon from "./axiosCommon.Service";

class DashboardDataService {
  getDashboardData = (id) => {
    return axiosCommon.get(`user-management/dashboard/${id}`);
  };
}

export default new DashboardDataService();
