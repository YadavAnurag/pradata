import axiosCommon from "./axiosCommon.Service";

class authService {
  // make login and get dashboard data based on user type either for user dashboard data or admin dashboard data
  authenticate = (authDetails) => {
    return axiosCommon.post(`auth-management/login`, authDetails);
  };

  getDashboardData = (id) => {
    return axiosCommon.get(`user-management/dashboard/${id}`);
  };
}

export default new authService();
