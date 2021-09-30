import axiosCommon from "./axiosCommon.Service";

class UsageDataService {
  create = (userId, usageData) => {
    return axiosCommon.post(`/usage-management/usages/${userId}`, usageData);
  };

  addPayment = (userId, paymentData) => {
    return axiosCommon.put(`/usage-management/usages/${userId}`, paymentData);
  };
}

export default new UsageDataService();
