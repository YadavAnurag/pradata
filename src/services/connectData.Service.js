import axiosCommon from "./axiosCommon.Service";

class ConnectDataService {
  get = () => {
    return axiosCommon.get(`connect-management/connect`);
  };

  update = (data) => {
    return axiosCommon.patch(`connect-management/connect`, data);
  };
}

export default new ConnectDataService();
