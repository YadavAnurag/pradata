import { v4 as uuid } from "uuid";
import moment from "moment";
import { toast } from "react-toastify";

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

  return async (dispatch) => {
    try {
      const response = await planDataService.create(plan);
      if (response.data.error) {
        toast.error(response.data.msg);
        return Promise.reject(response.data.msg);
      } else {
        dispatch(addPlan(response.data.plan));
        return Promise.resolve(response.data);
      }
    } catch (err) {
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

// initEditPlan
export const initEditPlan = ({ id = "", updates = {} } = {}) => {
  return async (dispatch) => {
    try {
      const response = await planDataService.update(id, updates);
      if (response.data.error) {
        toast.error(response.data.msg);
        return Promise.reject(response.data.msg);
      } else {
        dispatch(editPlan({ id, updates: response.data.updates }));
        return Promise.resolve(response.data);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };
};

// REMOVE_PLAN
export const removePlan = ({ id = "" } = {}) => {
  return {
    type: actionTypes.REMOVE_PLAN,
    id,
  };
};

// initRemove
export const initRemovePlan = ({ id = "" } = {}) => {
  return async (dispatch) => {
    try {
      const response = await planDataService.delete(id);
      if (response.data.error) {
        toast.error(response.data.msg);
        return Promise.reject(response.data.msg);
      } else {
        dispatch(removePlan({ id: response.data.removed }));
        return Promise.resolve(response.data.removed);
      }
    } catch (err) {
      return Promise.reject(err);
    }
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
  return async (dispatch) => {
    try {
      const response = await planDataService.getAll();
      if (response.data.error) {
        toast.error(response.data.msg);
        return Promise.reject(response.data.msg);
      } else {
        dispatch(setPlans(response.data.plans));
        return Promise.resolve(response.data);
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };
};
