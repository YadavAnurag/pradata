import * as actionTypes from "../../actions/actionTypes";
import moment from "moment";

// userFilter Reducer
const userFilterReducerDefaultState = {
  text: "",
  contactNumber: "",
  emailId: "",
  currentPlanId: "", // using dropdown
  userAccountStatus: "", //active or inactive
  isDue: null,
  sortBy: "dueDateAsc",
  startDate: moment().startOf("month").valueOf(),
  endDate: moment().endOf("month").valueOf(),
};
export const userFilterReducer = (
  state = userFilterReducerDefaultState,
  action
) => {
  switch (action.type) {
    case actionTypes.SET_USER_TEXT_FILTER:
      return { ...state, text: action.text };
    case actionTypes.SET_CONTACT_NUMBER_FILTER:
      return { ...state, contactNumber: action.contactNumber };
    case actionTypes.SET_EMAIL_ID_FILTER:
      return { ...state, emailId: action.emailId };
    case actionTypes.SET_CURRENT_PLAN_ID_FILTER:
      return { ...state, currentPlanId: action.currentPlanId };
    case actionTypes.SET_USER_ACCOUNT_STATUS_FILTER:
      console.log("action.userAccountStatus", action.userAccountStatus);
      return { ...state, userAccountStatus: action.userAccountStatus };
    case actionTypes.SET_IS_DUE_FILTER:
      return { ...state, isDue: action.isDue };
    case actionTypes.SET_USER_START_DATE_FILTER:
      return { ...state, startDate: action.startDate };
    case actionTypes.SET_USER_END_DATE_FILTER:
      return { ...state, endDate: action.endDate };
    case actionTypes.SET_SORT_BY_FILTER:
      return { ...state, sortBy: action.sortBy };
    default:
      return state;
  }
};
