import moment from "moment";
import { createStore, combineReducers } from "redux";
import { v4 as uuid } from "uuid";
import { users, plans } from "../fixtures/data";
import { userFilters } from "../fixtures/filters";
//actions

//user actions
//ADD_USER
const addUser = ({
  firstName = "", // required
  middleName = "",
  lastName = "",
  gender = "", // required
  emailId = "", // required
  contactNumber = "", // required
  address = "", // required
  accountStatus = "inactive", // required
  usages = [],
  createdAt = moment().valueOf(),
} = {}) => ({
  type: "ADD_USER",
  user: {
    id: uuid(),
    firstName: firstName.toLowerCase(),
    middleName: middleName.toLowerCase(),
    lastName: lastName.toLowerCase(),
    gender: gender.toLowerCase(),
    emailId: emailId.toLowerCase(),
    contactNumber,
    address,
    accountStatus,
    usages,
    createdAt,
  },
});

//EDIT_USER
const editUser = ({ id = "", updates = {} } = {}) => ({
  type: "EDIT_USER",
  id,
  updates,
});

//#TODO
//plan actions

//#TODO
// userFilter actions
// SET_TEXT_FILTER
const setTextFilter = ({ text = "" } = {}) => ({
  type: "SET_TEXT_FILTER",
});

//#TODO
// planFilter actions

// ----------- reducers ------------
// user reducer
// const userReducerDefaultState = new Array();
const userReducerDefaultState = new Array(...users);
const userReducer = (state = userReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return [...state, action.user];
    case 'EDIT_USER':
      return state.map(user => {
        if (user.id === action.id) {
          const 
        } else {
          return user;
        }
      });
    case 'EDIT_USER_USAGE':
      return state;
    default:
      return state;
  }
};

// plan reducer
// const planReducerDefaultState = new Array();
const planReducerDefaultState = new Array(...plans);
const planReducer = (state = planReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_PLAN":
      return [...state, action.plan];
    default:
      return state;
  }
};

// userFilter Reducer
const userFilterReducerDefaultState = {
  text: "",
  contactNumber: "",
  planId: "", // using dropdown
  accountStatus: "", //active or inactive
  sortBy: "dueDateDesc",
  startDate: moment().startOf("month"),
  endDate: moment().endOf("month"),
};
const userFilterReducer = (state = userFilterReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return { ...state, text: action.text };
    default:
      return state;
  }
};
const getVisibleUsers = (users, plans, userFilters) => {
  // prettier-ignore
  const { text = "", contactNumber = "", planId = "", accountStatus = "", sortBy = "textAsc", startDate = 0, endDate = 0, } = { ...userFilters };

  return users
    .filter((user) => {
      const textMatch = [user.firstName, user.middleName, user.lastName]
        .join(" ")
        .toLowerCase()
        .includes(text.toLowerCase());
      const contactNumberMatch = user.contactNumber.includes(contactNumber);

      // plan
      const userPlanId = user.usages.length
        ? user.usages[user.usages.length - 1].planId
        : "";
      const planIdMatch = userPlanId
        .toLowerCase()
        .includes(planId.toLowerCase());
      const accountStatusMatch = user.accountStatus
        .toLowerCase()
        .includes(accountStatus.toLowerCase());

      // calculate dueDate
      let userPlanDueDate = 0;
      if (user.usages.length) {
        const userLastUsage = user.usages[user.usages.length - 1];
        const userPlanLastRenewedAt = userLastUsage.startedAt;
        const planValidity = plans.find(
          (plan) => plan.id === userLastUsage.planId
        ).validityPeriod;
        userPlanDueDate = userPlanLastRenewedAt + planValidity;
      }
      const startDateMatch =
        typeof startDate !== "number" || userPlanDueDate >= startDate;
      const endDateMatch =
        typeof endDate !== "number" || userPlanDueDate <= endDate;

      return (
        textMatch &&
        contactNumberMatch &&
        planIdMatch &&
        accountStatusMatch &&
        startDateMatch &&
        endDateMatch
      );
    })
    .sort((firstUser, secondUser) => {
      if (sortBy === "textAsc") {
        const firstUserFullName = [
          firstUser.firstName,
          firstUser.middleName,
          firstUser.lastName,
        ].join(" ");
        const secondUserFullName = [
          secondUser.firstName,
          secondUser.middleName,
          secondUser.lastName,
        ].join(" ");
        return firstUserFullName > secondUserFullName;
      } else if (sortBy === "textDesc") {
        const firstUserFullName = [
          firstUser.firstName,
          firstUser.middleName,
          firstUser.lastName,
        ].join(" ");
        const secondUserFullName = [
          secondUser.firstName,
          secondUser.middleName,
          secondUser.lastName,
        ].join(" ");
        return firstUserFullName < secondUserFullName;
      } else if (sortBy === "dueDateDesc") {
        const firstUserFullName = [
          firstUser.firstName,
          firstUser.middleName,
          firstUser.lastName,
        ].join(" ");
        const secondUserFullName = [
          secondUser.firstName,
          secondUser.middleName,
          secondUser.lastName,
        ].join(" ");
        return firstUserFullName < secondUserFullName;
      } else if (sortBy === "dueDateAsc") {
        const firstUserFullName = [
          firstUser.firstName,
          firstUser.middleName,
          firstUser.lastName,
        ].join(" ");
        const secondUserFullName = [
          secondUser.firstName,
          secondUser.middleName,
          secondUser.lastName,
        ].join(" ");
        return firstUserFullName < secondUserFullName;
      } else {
        return 0;
      }
    });
};

// planFilter
// planFilterReducer

// #TODO
// first check filter with user and plan data if working or not then try with reducers
// const newFilters = {text: '', judge: '', tags: {stack: true, tree: true, queue: true}, sortBy: 'star', startDate: undefined, endDate: undefined};
//const newFilters = filters;
// const newProblems = problems;
// const result = getVisibleProblems(newProblems, newFilters);
// console.log('result', result);

// store creation
const store = createStore(
  combineReducers({
    users: userReducer,
    plans: planReducer,
    userFilters: userFilterReducer,
  })
);
store.getState();
const unsubscribe = store.subscribe(() => {
  // console.log(store.getState());

  const state = store.getState();
  const visibleUsers = getVisibleUsers(
    state.users,
    state.plans,
    state.userFilters
  );
  console.log(state.users, state.userFilters);
});

const firstUser = store.dispatch(
  addUser({
    firstName: "Anju",
    gender: "female",
    address: "MMMUT",
    contactNumber: "8354820950",
    emailId: "anju@gmail.com",
  })
);
const updatedFirst = store.dispatch(
  editUser({
    id: firstUser.id,
    updates: { firstName: "Anju Maurya" },
  })
);
