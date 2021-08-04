import moment from "moment";
import { v4 as uuid } from "uuid";

import * as actionTypes from "../actionTypes";

// user action

//ADD_USER
export const addUser = ({
  firstName = "", // required
  middleName = "",
  lastName = "",
  emailId = "", // required
  contactNumber = "", // required
  address = "", // required
  status = "inactive", // required
  isAdmin = false,
  usages = [],
  createdAt = moment().valueOf(),
} = {}) => ({
  type: actionTypes.ADD_USER,
  user: {
    id: uuid(),
    firstName: firstName.toLowerCase(),
    middleName: middleName.toLowerCase(),
    lastName: lastName.toLowerCase(),
    emailId: emailId.toLowerCase(),
    contactNumber,
    address,
    status,
    isAdmin,
    usages,
    createdAt,
  },
});

//EDIT_USER
export const editUser = ({ id = "", updates = {} } = {}) => {
  let userUpdates = {};

  if (updates.hasOwnProperty("firstName"))
    userUpdates = {
      ...userUpdates,
      firstName: updates.firstName.toLowerCase(),
    };
  if (updates.hasOwnProperty("middleName")) {
    userUpdates = {
      ...userUpdates,
      middleName: updates.middleName.toLowerCase(),
    };
  }
  if (updates.hasOwnProperty("lastName"))
    userUpdates = {
      ...userUpdates,
      lastName: updates.lastName.toLowerCase(),
    };
  if (updates.hasOwnProperty("emailId"))
    userUpdates = {
      ...userUpdates,
      emailId: updates.emailId.toLowerCase(),
    };
  if (updates.hasOwnProperty("status"))
    userUpdates = {
      ...userUpdates,
      status: updates.status.toLowerCase(),
    };

  return {
    type: actionTypes.EDIT_USER,
    id,
    updates: { ...updates, ...userUpdates },
  };
};

//REMOVE_USER
export const removeUser = ({ id = "" }) => ({
  type: actionTypes.REMOVE_USER,
  id,
});

//ADD_USAGE
export const addUsage = ({
  userId = "",
  planId = "", //required
  paymentDetails = [],
}) => {
  // console.log("got", paymentDetails);
  // let userPaymentDetails = [];
  // if (paymentDetails.length) {
  //   userPaymentDetails = paymentDetails.map((paymentDetail) => {
  //     if (paymentDetail.hasOwnProperty("paymentMethod")) {
  //       return {
  //         ...paymentDetail,
  //         paymentMethod: paymentDetail.paymentMethod.toLowerCase(),
  //       };
  //     } else return paymentDetail;
  //   });
  // }
  // console.log("now", userPaymentDetails);

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
