import axiosCommon from "./axiosCommon.Service";

class PlanDataService {
  getAll = () => {
    return axiosCommon.get("plan-management/plans");
  };

  get = (id) => {
    return axiosCommon.get(`plan-management/plans/${id}`);
  };

  create = (data) => {
    return axiosCommon.post(`plan-management/plans`, data);
  };

  update = (id, data) => {
    return axiosCommon.patch(`plan-management/plans/${id}`, data);
  };

  delete = (id) => {
    return axiosCommon.delete(`plan-management/plans/${id}`);
  };
}

export default new PlanDataService();
