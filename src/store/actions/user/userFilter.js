import * as actionTypes from "../actionTypes";
import moment from "moment";

export const setUserTextFilter = ({ text = "" } = {}) => ({
  type: actionTypes.SET_USER_TEXT_FILTER,
  text,
});

// setContactNumberFilter
export const setContactNumberFilter = ({ contactNumber = "" } = {}) => ({
  type: actionTypes.SET_CONTACT_NUMBER_FILTER,
  contactNumber,
});

// setEmailIdFilter
export const setEmailIdFilter = ({ emailId = "" } = {}) => ({
  type: actionTypes.SET_EMAIL_ID_FILTER,
  emailId,
});

// setCurrentPlanIdFilter
export const setCurrentPlanIdFilter = ({ currentPlanId = "" } = {}) => ({
  type: actionTypes.SET_CURRENT_PLAN_ID_FILTER,
  currentPlanId,
});

// setUserAccountStatusFilter
export const setUserAccountStatusFilter = ({ userAccountStatus = "" } = {}) => {
  return {
    type: actionTypes.SET_USER_ACCOUNT_STATUS_FILTER,
    userAccountStatus,
  };
};

// setIsDueFilter
export const setIsDueFilter = ({ isDue = null } = {}) => ({
  type: actionTypes.SET_IS_DUE_FILTER,
  isDue,
});

// setSortBy
export const setSortByFilter = ({ sortBy = "" }) => ({
  type: actionTypes.SET_SORT_BY_FILTER,
  sortBy,
});

// setUserStartDateFilter
export const setUserStartDateFilter = ({
  startDate = moment().startOf("month").valueOf(),
}) => ({
  type: actionTypes.SET_USER_START_DATE_FILTER,
  startDate,
});

// setUserEndDateFilter
export const setUserEndDateFilter = ({
  endDate = moment().endOf("month").valueOf(),
}) => ({
  type: actionTypes.SET_USER_END_DATE_FILTER,
  endDate,
});
