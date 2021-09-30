import moment from "moment";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";

import * as actionTypes from "../actionTypes";
import config from "../../../utils/config";
import userDataService from "../../../services/userData.Service";
import usageDataService from "../../../services/usageData.Service";

// user action

//ADD_USER
export const addUser = (user) => {
  console.log("addUser called");
  return {
    type: actionTypes.ADD_USER,
    user,
  };
};

// init addUser
export const initAddUser = (userObject = {}) => {
  const {
    firstName = "", // required
    middleName = "",
    lastName = "",
    emailId = "", // required
    contactNumber = "", // required
    address = "", // required
    status = "inactive", // required
  } = userObject;
  const user = {
    firstName: firstName.toLowerCase(),
    middleName: middleName.toLowerCase(),
    lastName: lastName.toLowerCase(),
    emailId: emailId.toLowerCase(),
    contactNumber,
    address,
    status,

    id: uuid(),
    isAdmin: false,
    usages: [],
    createdAt: moment().valueOf(),
  };

  console.log("Gonna send", user);
  return async (dispatch) => {
    try {
      const response = await userDataService.create(user);
      console.log("Got response", response);
      dispatch(addUser(response.data.user));
      return Promise.resolve(response.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
};

//EDIT_USER
export const editUser = ({ id, updates }) => {
  return {
    type: actionTypes.EDIT_USER,
    id,
    updates,
  };
};

// initEditUser
export const initEditUser = ({ id = "", updates = {} } = {}) => {
  return async (dispatch) => {
    try {
      const response = await userDataService.update(id, updates);
      dispatch(editUser({ id, updates: response.data.updates }));
      return Promise.resolve(response.data.updates);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  };
};

//REMOVE_USER
export const removeUser = ({ id = "" }) => ({
  type: actionTypes.REMOVE_USER,
  id,
});

// initRemoteUser
export const initRemoveUser = ({ id = "" } = {}) => {
  return async (dispatch) => {
    try {
      const response = await userDataService.delete(id);
      if (response.data.err) {
        throw new Error(response.data.err);
      }
      console.log(response);
      dispatch(removeUser({ id: response.data.removed }));
      return Promise.resolve(response.data.removed);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  };
};

//ADD_USAGE
export const addUsage = ({ userId = "", usage = {} }) => {
  return {
    type: actionTypes.ADD_USAGE,
    userId,
    usage,
  };
};

// init add usage
export const initAddUsage = ({
  userId = "",
  planId = "", //required
  paymentDetails = [],
} = {}) => {
  const usage = {
    id: uuid(),
    planId,
    startedAt: moment().valueOf(),
    paymentDetails,
    createdAt: moment().valueOf(),
  };

  return async (dispatch) => {
    try {
      console.log("Gonna send", usage);
      const response = await usageDataService.create(userId, usage);
      console.log("Got response", response);
      if (response.data.error) {
        // if got error, then don't dispatch
        toast.error(response.data.error);
        return Promise.reject(response.data.error);
      } else {
        // if got no error, then dispatch
        dispatch(addUsage({ userId, usage }));
      }
      return Promise.resolve(response.data.removed);
    } catch (err) {
      toast.error("Got error");
      console.log(err);
      return Promise.reject(err);
    }
  };
};

// ADD_PAYMENT
export const addPayment = ({
  userId = "",
  usageId = "",
  paymentDetail = {},
} = {}) => {
  return {
    type: actionTypes.ADD_PAYMENT,
    userId,
    usageId,
    paymentDetail,
  };
};

// init add payment
export const initAddPayment = ({
  userId = "",
  usageId = "", //required
  paymentDetail = {},
} = {}) => {
  const paymentData = {
    userId,
    usageId,
    paymentDetail,
  };

  return async (dispatch) => {
    try {
      console.log("Gonna send", userId, usageId, paymentDetail);
      const response = await usageDataService.addPayment(
        paymentData.userId,
        paymentData
      );
      console.log("Got response", response);
      if (response.data.error) {
        // if got error, then don't dispatch
        toast.error(response.data.msg);
        return Promise.reject(response.data.msg);
      } else {
        // if got no error, then dispatch
        dispatch(
          addPayment({
            userId: paymentData.userId,
            usageId: paymentData.usageId,
            paymentDetail: paymentData.paymentDetail,
          })
        );
      }
      return Promise.resolve(response.data.msg);
    } catch (err) {
      toast.error("Got Error...");
      console.log(err);
      return Promise.reject(err);
    }
  };
};

// set users from server
export const setUsers = (users) => {
  return {
    type: actionTypes.SET_USERS,
    users,
  };
};

// if fetch users failed
export const fetchUsersFailed = () => {
  return {
    type: actionTypes.FETCH_USERS_FAILED,
  };
};

// set initSetUsers
export const initSetUsers = () => {
  console.log("user.js - initSetUsers - being initSetUsers");
  return async (dispatch) => {
    try {
      const response = await userDataService.getAll();

      console.log("user.js - initSetUsers - response", response);
      dispatch(setUsers(response.data.users));
      return Promise.resolve(response.data.users);
    } catch (err) {
      return Promise.reject(err);
    }
  };
};
