import * as actionTypes from "../actionTypes";

// planFilters actions
// SET_PLAN_TEXT_FILTER
export const setPlanTextFilter = ({ text = "" } = {}) => ({
  type: actionTypes.SET_PLAN_TEXT_FILTER,
  text,
});

// SET_PRICE_FILTER
export const setPriceFilter = ({ price = 0 } = {}) => ({
  type: actionTypes.SET_PRICE_FILTER,
  price,
});

// SET_PLAN_STATUS_FILTER
export const setPlanStatusFilter = ({ planStatus = "active" } = {}) => ({
  type: actionTypes.SET_PLAN_STATUS_FILTER,
  planStatus,
});

// SET_VALIDITY_PERIOD_FILTER
export const setValidityPeriodFilter = ({ validityPeriod = 0 } = {}) => ({
  type: actionTypes.SET_VALIDITY_PERIOD_FILTER,
  validityPeriod,
});

// setPlanStartDateFilter
export const setPlanStartDateFilter = ({
  startDate = moment().startOf("month").valueOf(),
} = {}) => ({
  type: actionTypes.SET_PLAN_START_DATE_FILTER,
  startDate,
});

// setPlanEndDateFilter
export const setPlanEndDateFilter = ({
  endDate = moment().endOf("month").valueOf(),
} = {}) => ({
  type: actionTypes.SET_PLAN_END_DATE_FILTER,
  endDate,
});

// setPlanSortByFilter
export const setPlanSortByFilter = ({ sortBy = "price" }) => ({
  type: actionTypes.SET_PLAN_SORT_BY_FILTER,
  sortBy,
});
