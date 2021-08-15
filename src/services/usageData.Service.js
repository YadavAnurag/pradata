import axiosCommon from "./axiosCommon.Service";

class UsageDataService {
  create = (id, data) => {
    return axiosCommon.post(`user-management/users/${id}`, data);
  };
}

export default new UsageDataService();
