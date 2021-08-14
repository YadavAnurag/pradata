import moment from "moment";
import { v4 as uuid } from "uuid";

import * as actionTypes from "../actionTypes";
import config from "../../../utils/config";
import userDataService from "../../../services/userData.Service";

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

  return async (dispatch) => {
    try {
      const response = await userDataService.create(user);
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
export const addUsage = ({
  userId = "",
  planId = "", //required
  paymentDetails = [],
}) => {
  return {
    type: actionTypes.ADD_USAGE,
    userId,
    usage: {
      id: uuid(),
      planId,
      startedAt: moment().valueOf(),
      paymentDetails,
    },
  };
};

// ADD_PAYMENT
export const addPayment = ({
  userId = "",
  usageId = "",
  paymentDetail = {},
}) => {
  console.log("And I got this\n", {
    userId,
    usageId,
    paymentDetail,
  });
  // let userPaymentDetail = {};
  // if (paymentDetail.hasOwnProperty("paymentMethod")) {
  //   userPaymentDetail = {
  //     ...paymentDetail,
  //     paymentMethod: paymentDetail.paymentMethod.toLowerCase(),
  //   };
  // } else {
  //   // payment must have to have paymentMethod
  // }

  return {
    type: actionTypes.ADD_PAYMENT,
    userId,
    usageId,
    paymentDetail,
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
  // console.log("user.js - initSetUsers - being initSetUsers");
  return async (dispatch) => {
    try {
      const response = await userDataService.getAll();

      // console.log("user.js - initSetUsers - response", response);
      dispatch(setUsers(response.data.users));
    } catch (err) {
      console.log(err);
    }
  };
};
