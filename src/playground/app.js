import { createStore, combineReducers } from "redux";
import uuid from "uuid";
import { users, plans } from "../fixtures/data";

//actions

//user actions
//ADD_USER
const addUser = ({
  firstName = "",
  middleName = "",
  lastName = "",
  gender = "",
  emailId = "",
  contactNumber = "",
  address = "",
  accountStatus = "inactive",
  usages = new Array(),
  createdAt = 0,
}) => ({
  type: "ADD_USER",
  user: {
    id,
    firstName,
    middleName,
    lastName,
    gender,
    emailId,
    contactNumber,
    address,
    accountStatus,
    usages,
    createdAt,
  },
});

//#TODO
//plan actions

//#TODO
// userFilter actions
// SET_TEXT_FILTER
const setTextFilter = ({ text = "" }) => ({
  type: "SET_TEXT_FILTER",
});

//#TODO
// planFilter actions

// ----------- reducers ------------
// user reducer
const userReducerDefaultState = new Array();
const userReducer = (state = userReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return new Array(...state, action.user);
  }
};

// plan reducer
const planReducerDefaultState = new Array();
const planReducer = (state = planReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_PLAN":
      return new Array(...state, action.plan);
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
  const {
    text = "",
    contactNumber = "",
    planId = "", // using dropdown
    accountStatus = "", //active or inactive
    sortBy = "textAsc",
    startDate = 0,
    endDate = 0,
  } = userFilters;

  return users
    .filter((user) => {
      const textMatch = new Array(
        user.firstName,
        user.middleName,
        user.lastName
      )
        .join(" ")
        .toLowerCase()
        .includes(text.toLowerCase());
      const contactNumberMatch = user.contactNumber.includes(contactNumber);
      const planIdMatch = user.planId
        .toLowerCase()
        .includes(planId.toLowerCase());
      const accountStatusMatch = user.accountStatus
        .toLowerCase()
        .includes(accountStatus.toLowerCase());

      // calculate dueDate
      let userPlanDueDate = 0;
      if (user.usages.length) {
        const userPlanLastRenewedAt =
          user.usages[user.usages.length - 1]["startedAt"];
        const planValidity = plans.find((plan) => plan.id === planId)[
          validityPeriod
        ];
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
        firstUserFullName = new Array(
          firstUser.firstName,
          firstUser.middleName,
          firstUser.lastName
        ).join(" ");
        secondUserFullName = new Array(
          secondUser.firstName,
          secondUser.middleName,
          secondUser.lastName
        ).join(" ");
        return firstUserFullName > secondUserFullName;
      }
      if (sortBy === "textDesc") {
        firstUserFullName = new Array(
          firstUser.firstName,
          firstUser.middleName,
          firstUser.lastName
        ).join(" ");
        secondUserFullName = new Array(
          secondUser.firstName,
          secondUser.middleName,
          secondUser.lastName
        ).join(" ");
        return firstUserFullName < secondUserFullName;
      }
      if (sortBy === "dueDateDesc") {
        firstUserFullName = new Array(
          firstUser.firstName,
          firstUser.middleName,
          firstUser.lastName
        ).join(" ");
        secondUserFullName = new Array(
          secondUser.firstName,
          secondUser.middleName,
          secondUser.lastName
        ).join(" ");
        return firstUserFullName < secondUserFullName;
      }
      if (sortBy === "dueDateAsc") {
        firstUserFullName = new Array(
          firstUser.firstName,
          firstUser.middleName,
          firstUser.lastName
        ).join(" ");
        secondUserFullName = new Array(
          secondUser.firstName,
          secondUser.middleName,
          secondUser.lastName
        ).join(" ");
        return firstUserFullName < secondUserFullName;
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
    userFilters: userFilterReducer,
  })
);

const unsubscribe = store.subscribe(() => {
  // console.log(store.getState());

  const state = store.getState();
  const visibleUsers = getVisibleUsers(state.users, state.userFilters);
  console.log(visibleUsers, state.userFilters);
});
