import * as actionTypes from "../../actions/actionTypes";
import { plans } from "../../../fixtures/data";

const addPlan = (state, action) => {
  return [...state, action.plan];
};
const editPlan = (state, action) => {
  return state.map((plan) => {
    if (plan.id === action.id) {
      return { ...plan, ...action.updates };
    } else {
      return plan;
    }
  });
};
const removePlan = (state, action) => {
  const updated = state.filter(({ id }) => {
    return id !== action.id;
  });
  return updated;
};

// set plans
const setPlans = (state, action) => {
  return action.plans;
};

// plan reducer
const planReducerDefaultState = [];
export const planReducer = (state = planReducerDefaultState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PLAN:
      return addPlan(state, action);
    case actionTypes.EDIT_PLAN:
      return editPlan(state, action);
    case actionTypes.REMOVE_PLAN:
      return removePlan(state, action);
    case actionTypes.SET_PLANS:
      return setPlans(state, action);
    default:
      return state;
  }
};
