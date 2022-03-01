import { toast } from "react-toastify";
import * as actionTypes from "../actionTypes";
import connectDataService from "../../../services/connectData.Service";

//connect actions
// EDIT_CONNECT
export const editConnect = ({ updates = {} } = {}) => ({
  type: actionTypes.EDIT_CONNECT,
  updates,
});

// initEditConnect
export const initEditConnect = ({ updates = {} } = {}) => {
  console.log("gonna update connect");
  return async (dispatch) => {
    try {
      const response = await connectDataService.update(updates);
      console.log("Got response", response);
      if (response.data.error) {
        toast.error(response.data.msg);
        console.log(response.data.error);
        return Promise.reject(response.data.msg);
      } else {
        dispatch(editConnect({ updates: response.data.updates }));
        return Promise.resolve(response.data);
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  };
};

// set connect from server
export const setConnect = (connect) => {
  return {
    type: actionTypes.SET_CONNECT,
    connect,
  };
};

// If fetch connect failed
export const fetchConnectFailed = () => {
  return {
    type: actionTypes.FETCH_CONNECT_FAILED,
  };
};

// set initSetConnect
export const initSetConnect = () => {
  console.log("initSetConnect begins");
  return async (dispatch) => {
    try {
      const response = await connectDataService.get();
      if (response.data.error) {
        toast.error(response.data.msg);
        console.log("got response", response.data.err);
        return Promise.reject(response.data.msg);
      } else {
        console.log("got response", response.data.connect);
        dispatch(setConnect(response.data.connect));
        return Promise.resolve(response.data);
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  };
};
