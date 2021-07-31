import * as actionTypes from "../actionTypes";

//plan actions
// ADD_PLAN
export const addPlan = ({
  title = "Plan Name Not Decided Yet",
  price = 0,
  status = "inactive",
  description = "A good plan for an average income family",
  validityPeriod = 0,
} = {}) => ({
  type: actionTypes.ADD_PLAN,
  plan: {
    id: uuid(),
    title,
    price,
    status,
    description,
    validityPeriod,
    createdAt: moment().valueOf(),
  },
});

// EDIT_PLAN
export const editPlan = ({ id = "", updates = {} } = {}) => ({
  type: actionTypes.EDIT_PLAN,
  id,
  updates,
});

// REMOVE_PLAN
export const removePlan = ({ id = "" } = {}) => ({
  type: actionTypes.REMOVE_PLAN,
  id,
});
