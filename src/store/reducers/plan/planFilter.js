import * as actionTypes from "../../actions/actionTypes";
import moment from "moment";

const setPlanTextFilter = (state, action) => {
  return { ...state, text: action.text };
};
const setPriceFilter = (state, action) => {
  return { ...state, price: action.price };
};

// planFilterReducer
// const planFilterReducerDefaultState = {};
const planFilterReducerDefaultState = {
  text: "",
  price: 100,
  planStatus: "active",
  validityPeriod: 15,
  startDate: moment().startOf("month").valueOf(),
  endDate: moment().endOf("month").valueOf(),
  sortBy: "priceAsc",
};
export const planFilterReducer = (
  state = planFilterReducerDefaultState,
  action
) => {
  switch (action.type) {
    case actionTypes.SET_PLAN_TEXT_FILTER:
      return setPlanTextFilter(state, action);
    case actionTypes.SET_PRICE_FILTER:
      return setPriceFilter(state, action);
    case actionTypes.SET_PLAN_STATUS_FILTER:
      return { ...state, planStatus: action.planStatus };
    case "SET_VALIDITY_PERIOD_FILTER":
      return { ...state, validityPeriod: action.validityPeriod };
    case "SET_PLAN_START_DATE_FILTER":
      return { ...state, startDate: action.startDate };
    case "SET_PLAN_END_DATE_FILTER":
      return { ...state, endDate: action.endDate };
    case "SET_PLAN_SORT_BY_FILTER":
      return { ...state, sortBy: action.sortBy };
    default:
      return state;
  }
};
