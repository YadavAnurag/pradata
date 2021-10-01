/* eslint-disable */
import { getUsagePaymentDetails } from "../store/utility/utility";

export const isValidEmailId = (emailId) => {
  return emailId.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const validateEmailId = (emailId) => {
  return emailId.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const validateDigits = (digits) => {
  if (digits.length !== 10) return false;

  return digits.match(/^\d{1,}(\.?\d{0,2})$/);
};

export const isValidPassword = (password) => {
  return password.match(
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  );
};

export const getUserPaymentDetailsWithAllUsages = (user, plans) => {
  const details = {
    totalDueAmount: 0,
    totalPaymentReceived: 0,
  };

  if (user.usages.length) {
    // all payments total
    const totalPaymentReceived = user.usages.reduce(
      (amountReceived, usage) =>
        amountReceived +
        getUsagePaymentDetails({ usage, plans }).totalPaidAmountToThisUsage,
      0
    );
    details.totalPaymentReceived = totalPaymentReceived;

    // all plan price total
    const totalDueAmount = user.usages.reduce(
      (dueAmount, usage) =>
        dueAmount +
        getUsagePaymentDetails({ usage, plans }).totalDueToThisUsage,
      0
    );
    details.totalDueAmount = totalDueAmount;
  } else {
    // no usages at all
  }

  return details;
};
