import axiosCommon from "./axiosCommon.Service";

class UserDataService {
  getAll = () => {
    return axiosCommon.get("user-management/users");
  };

  get = (id) => {
    return axiosCommon.get(`user-management/users/${id}`);
  };

  create = (data) => {
    return axiosCommon.post(`user-management/users`, data);
  };

  update = (id, data) => {
    return axiosCommon.patch(`user-management/users/${id}`, data);
  };

  delete = (id) => {
    return axiosCommon.delete(`user-management/users/${id}`);
  };

  getDashboardData = (id) => {
    return axiosCommon.get(`user-management/dashboard/${id}`);
  };
}

export default new UserDataService();
