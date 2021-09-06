import { v4 as uuid } from "uuid";
import moment from "moment";

import * as actionTypes from "../actionTypes";
import planDataService from "../../../services/planData.Service";

//plan actions
// ADD_PLAN
export const addPlan = (plan) => {
  return {
    type: actionTypes.ADD_PLAN,
    plan,
  };
};

// init addPlan
export const initAddPlan = (planObject = {}) => {
  const {
    title = "Not decided yet",
    price = 0,
    status = "inactive",
    description = "Not decided yet",
    validityPeriod = 0,
  } = planObject;

  const plan = {
    id: uuid(),
    title: title.toLowerCase(),
    price,
    status,
    description,
    validityPeriod,
    createdAt: moment().valueOf(),
  };

  console.log("gonna send");
  return async (dispatch) => {
    try {
      const response = await planDataService.create(plan);
      console.log("Got response", response);
      if (response.data.error) {
        throw new Error(response.data.error);
      } else {
        dispatch(addPlan(response.data.plan));
        return Promise.resolve(response.data);
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  };
};

// EDIT_PLAN
export const editPlan = ({ id = "", updates = {} } = {}) => ({
  type: actionTypes.EDIT_PLAN,
  id,
  updates,
});

// REMOVE_PLAN
export const removePlan = ({ id = "" } = {}) => {
  console.log("got id", id);
  return {
    type: actionTypes.REMOVE_PLAN,
    id,
  };
};

// set plans from server
export const setPlans = (plans) => {
  return {
    type: actionTypes.SET_PLANS,
    plans,
  };
};

// If fetch plans failed
export const fetchPlansFailed = () => {
  return {
    type: actionTypes.FETCH_PLANS_FAILED,
  };
};

// set initSetPlans
export const initSetPlans = () => {
  console.log("initSetPlans begins");
  return async (dispatch) => {
    try {
      const response = await planDataService.getAll();
      if (response.data.error) {
        console.log("got response", response.data.msg);
        return Promise.reject(response.data.error);
      } else {
        dispatch(setPlans(response.data.plans));
        return Promise.resolve(response.data);
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  };
};
