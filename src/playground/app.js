import moment from "moment";
import { createStore, combineReducers } from "redux";
import { v4 as uuid } from "uuid";
import { users, plans } from "../fixtures/data";
import { userFilters } from "../fixtures/filters";
import { getTotalPaymentReceivedToLastUsage } from "../store/utility/utility";
//actions

//user actions
//ADD_USER
const addUser = ({
  firstName = "", // required
  middleName = "",
  lastName = "",
  emailId = "", // required
  contactNumber = "", // required
  address = "", // required
  status = "inactive", // required
  usages = [],
  createdAt = moment().valueOf(),
} = {}) => ({
  type: "ADD_USER",
  user: {
    id: uuid(),
    firstName: firstName.toLowerCase(),
    middleName: middleName.toLowerCase(),
    lastName: lastName.toLowerCase(),
    emailId: emailId.toLowerCase(),
    contactNumber,
    address,
    status,
    usages,
    createdAt,
  },
});

//EDIT_USER
const editUser = ({ id = "", updates = {} } = {}) => {
  let userUpdates = {};

  if (updates.hasOwnProperty("firstName"))
    userUpdates = {
      ...userUpdates,
      firstName: updates.firstName.toLowerCase(),
    };
  if (updates.hasOwnProperty("middleName")) {
    userUpdates = {
      ...userUpdates,
      middleName: updates.middleName.toLowerCase(),
    };
  }
  if (updates.hasOwnProperty("lastName"))
    userUpdates = {
      ...userUpdates,
      lastName: updates.lastName.toLowerCase(),
    };
  if (updates.hasOwnProperty("emailId"))
    userUpdates = {
      ...userUpdates,
      emailId: updates.emailId.toLowerCase(),
    };
  if (updates.hasOwnProperty("status"))
    userUpdates = {
      ...userUpdates,
      status: updates.status.toLowerCase(),
    };

  return {
    type: "EDIT_USER",
    id,
    updates: { ...updates, ...userUpdates },
  };
};

//REMOVE_USER
const removeUser = ({ id = "" }) => ({
  type: "REMOVE_USER",
  id,
});
//ADD_USAGE
const addUsage = ({
  userId = "",
  planId = "", //required
  paymentDetails = [],
}) => {
  let userPaymentDetails = [];
  if (paymentDetails.length) {
    userPaymentDetails = paymentDetails.map((paymentDetail) => {
      if (paymentDetail.hasOwnProperty("paymentMethod")) {
        return {
          ...paymentDetail,
          paymentMethod: paymentDetail.paymentMethod.toLowerCase(),
        };
      } else return paymentDetail;
    });
  } else {
  }

  return {
    type: "ADD_USAGE",
    userId,
    usage: {
      id: uuid(),
      planId,
      startedAt: moment().valueOf(),
      paymentDetails: userPaymentDetails,
    },
  };
};

//EDIT_USAGE // editUsage not allowed
//REMOVE_USAGE // removeUsage not allowed

// ADD_PAYMENT
const addPayment = ({ userId = "", usageId = "", paymentDetail = {} }) => {
  let userPaymentDetail = {};
  if (paymentDetail.hasOwnProperty("paymentMethod")) {
    userPaymentDetail = {
      ...paymentDetail,
      paymentMethod: paymentDetail.paymentMethod.toLowerCase(),
    };
  } else {
    // payment must have paymentMethod
  }

  return {
    type: "ADD_PAYMENT",
    userId,
    usageId,
    paymentDetail: {
      ...userPaymentDetail,
      id: uuid(),
      paidAt: moment().valueOf(),
    },
  };
};

//#TODO
//plan actions

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
    case "EDIT_USER":
      return state.map((user) => {
        if (user.id === action.id) {
          return { ...user, ...action.updates };
        } else {
          return user;
        }
      });
    case "REMOVE_USER":
      return state.filter(({ id }) => id !== action.id);

    case "ADD_USAGE":
      return state.map((user) => {
        if (user.id === action.userId) {
          /* 
          TODO - add feature of override recharge, means additional usage addition
           even if current usage plan is not completed yet, override existing usage
           and somehow mark it as completed and add new one as current plan.
          */
          return { ...user, usages: user.usages.concat(action.usage) };
        } else return user;
      });

    //EDIT_USAGE is not allowed
    // case "EDIT_USAGE": return state;

    // REMOVE_USAGE is not allowed
    // case "REMOVE_USAGE": return state;

    case "ADD_PAYMENT":
      return state.map((user) => {
        if (user.id === action.userId) {
          const updatedUsages = user.usages.map((usage) => {
            if (usage.id === action.usageId) {
              return {
                ...usage,
                paymentDetails: usage.paymentDetails.concat(
                  action.paymentDetail
                ),
              };
            } else return usage;
          });

          return { ...user, usages: updatedUsages };
        } else return user;
      });

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

//#TODO
// +userFilter actions
// SET_TEXT_FILTER
const setTextFilter = ({ text = "" } = {}) => ({
  type: "SET_TEXT_FILTER",
  text,
});

// setContactNumberFilter
const setContactNumberFilter = ({ contactNumber = "" } = {}) => ({
  type: "SET_CONTACT_NUMBER_FILTER",
  contactNumber,
});

// setEmailIdFilter
const setEmailIdFilter = ({ emailId = "" } = {}) => ({
  type: "SET_EMAIL_ID_FILTER",
  emailId,
});

// setCurrentPlanIdFilter
const setCurrentPlanIdFilter = ({ currentPlanId = "" } = {}) => ({
  type: "SET_CURRENT_PLAN_ID_FILTER",
  currentPlanId,
});

// setUserAccountStatusFilter
const setUserAccountStatusFilter = ({ userAccountStatus = "" } = {}) => ({
  type: "SET_USER_ACCOUNT_STATUS_FILTER",
  userAccountStatus,
});

// setIsDueFilter
const setIsDueFilter = ({ isDue = null } = {}) => ({
  type: "SET_IS_DUE_FILTER",
  isDue,
});

// setSortBy
const setSortByFilter = ({ sortBy = "" }) => ({
  type: "SET_SORT_BY_FILTER",
  sortBy,
});

// setStartDateFilter
const setStartDateFilter = ({
  startDate = moment().startOf("month").valueOf(),
}) => ({
  type: "SET_START_DATE_FILTER",
  startDate,
});

// setEndDateFilter
const setEndDateFilter = ({ endDate = moment().endOf("month").valueOf() }) => ({
  type: "SET_END_DATE_FILTER",
  endDate,
});

// -userFilter actions

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
const userFilterReducer = (state = userFilterReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return { ...state, text: action.text };
    case "SET_CONTACT_NUMBER_FILTER":
      return { ...state, contactNumber: action.contactNumber };
    case "SET_EMAIL_ID_FILTER":
      return { ...state, emailId: action.emailId };
    case "SET_CURRENT_PLAN_ID_FILTER":
      return { ...state, currentPlanId: action.currentPlanId };
    case "SET_USER_ACCOUNT_STATUS_FILTER":
      return { ...state, userAccountStatus: action.userAccountStatus };
    case "SET_IS_DUE_FILTER":
      return { ...state, isDue: action.isDue };
    case "SET_START_DATE_FILTER":
      return { ...state, startDate: action.startDate };
    case "SET_END_DATE_FILTER":
      return { ...state, endDate: action.endDate };
    case "SET_SORT_BY_FILTER":
      return { ...state, sortBy: action.sortBy };
    default:
      return state;
  }
};
const getVisibleUsers = (users, plans, userFilters) => {
  const {
    text = "",
    emailId = "",
    contactNumber = "",
    currentPlanId = "",
    userAccountStatus = "",
    isDue = null,
    sortBy = "dueDateAsc",
    startDate = moment().startOf("month").valueOf(),
    endDate = moment().endOf("month").valueOf(),
  } = { ...userFilters };

  return users
    .filter((user) => {
      const textMatch = [user.firstName, user.middleName, user.lastName]
        .join(" ")
        .toLowerCase()
        .includes(text.toLowerCase());
      console.log("1 name match", textMatch);

      const emailIdMatch = user.emailId
        .toLowerCase()
        .includes(emailId.toLowerCase());

      // contactNumberMarth
      const contactNumberMatch = user.contactNumber.includes(contactNumber);

      // calculate user current plan
      const userPlanId = user.usages.length
        ? user.usages[user.usages.length - 1].planId
        : "";
      const currentPlanIdMatch = userPlanId
        .toLowerCase()
        .includes(currentPlanId.toLowerCase());

      console.log(
        "matching",
        user.status.toLowerCase(),
        userAccountStatus.toLowerCase()
      );
      // userAccountStatusMatch
      const userAccountStatusMatch = !!userAccountStatus
        ? user.status.toLowerCase() === userAccountStatus.toLowerCase()
        : true;

      /* check if isDue is null, means no use of calculation of dues of user
        just mark isDueMatch as true */

      // isDueMatch
      let isDueMatch = true;
      if (isDue !== null) {
        // calculate if user is in due
        const { userInDue } = getTotalPaymentReceivedToLastUsage(user, plans);

        //if user has any due or not
        if (isDue === true) {
          isDueMatch = userInDue === true ? true : false;
        } else {
          isDueMatch = userInDue === true ? false : true;
        }
      } else {
        isDueMatch = true;
      }

      // +startDateMatch and endDateMatch
      let startDateMatch = false,
        endDateMatch = false;
      // calculation of userPlanDueDate
      // let userPlanDueDate = null;
      if (isDue !== null) {
        const { currentPlanDueDate: userPlanDueDate } =
          getTotalPaymentReceivedToLastUsage(user, plans);
        // if (user.usages.length) {
        //   const userLastUsage = user.usages[user.usages.length - 1];
        //   const userPlanLastRenewedAt = userLastUsage.startedAt;
        //   const planValidity = plans.find(
        //     (plan) => plan.id === userLastUsage.planId
        //   ).validityPeriod;
        //   userPlanDueDate = userPlanLastRenewedAt + planValidity;
        // } else {
        // }

        startDateMatch =
          userPlanDueDate === null ? false : userPlanDueDate >= startDate;
        endDateMatch =
          userPlanDueDate === null ? false : userPlanDueDate <= endDate;
      } else {
        startDateMatch = true;
        endDateMatch = true;
      }

      console.log(
        "all Match",
        "userId",
        user.id,
        "textMatch",
        textMatch,
        "contactNumberMatch",
        contactNumberMatch,
        "emailIdMatch",
        emailIdMatch,
        "currentPlanIdMatch",
        currentPlanIdMatch,
        "userAccountStatusMatch",
        userAccountStatusMatch,
        "isDueMatch",
        isDueMatch,
        "startDateMatch",
        startDateMatch,
        "endDateMatch",
        endDateMatch,
        "final",
        textMatch &&
          contactNumberMatch &&
          emailIdMatch &&
          currentPlanIdMatch &&
          userAccountStatusMatch &&
          isDueMatch &&
          startDateMatch &&
          endDateMatch
      );
      return (
        textMatch &&
        contactNumberMatch &&
        emailIdMatch &&
        currentPlanIdMatch &&
        userAccountStatusMatch &&
        isDueMatch &&
        startDateMatch &&
        endDateMatch
      );
    })
    .sort((firstUser, secondUser) => {
      console.log("1");
      if (sortBy.includes("text")) {
        console.log("2");
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
        return sortBy === "textAsc"
          ? firstUserFullName > secondUserFullName
          : firstUserFullName < secondUserFullName;
      } else if (sortBy.includes("dueAmount")) {
        console.log("4");
        const {
          totalPaymentReceived: firstUserTotalPaymentReceived,
          currentPlanPrice: firstUserCurrentPlanPrice,
        } = getTotalPaymentReceivedToLastUsage(firstUser, plans);
        const {
          totalPaymentReceived: secondUserTotalPaymentReceived,
          currentPlanPrice: secondUserCurrentPlanPrice,
        } = getTotalPaymentReceivedToLastUsage(secondUser, plans);

        // calculate due amounts
        const firstUserDueAmount =
          firstUserCurrentPlanPrice - firstUserTotalPaymentReceived;
        const secondUserDueAmount =
          secondUserCurrentPlanPrice - secondUserTotalPaymentReceived;

        console.log(firstUser.firstName, firstUserDueAmount);
        console.log(secondUser.firstName, secondUserDueAmount);
        return sortBy === "dueAmountAsc"
          ? firstUserDueAmount > secondUserDueAmount
          : firstUserDueAmount < secondUserDueAmount;
      } else if (sortBy.includes("dueDate")) {
        console.log("6", plans);

        const { currentPlanDueDate: firstUserCurrentPlanDueDate } =
          getTotalPaymentReceivedToLastUsage(firstUser, plans);
        const { currentPlanDueDate: secondUserCurrentPlanDueDate } =
          getTotalPaymentReceivedToLastUsage(secondUser, plans);

        console.log(
          firstUser.firstName,
          moment(firstUserCurrentPlanDueDate).format()
        );
        console.log(
          secondUser.firstName,
          moment(secondUserCurrentPlanDueDate).format()
        );
        return sortBy === "dueDateAsc"
          ? firstUserCurrentPlanDueDate > secondUserCurrentPlanDueDate
          : firstUserCurrentPlanDueDate > secondUserCurrentPlanDueDate;
      } else {
        console.log("7");
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
  // console.log(state.users, state.userFilters);
  console.log(visibleUsers, state.userFilters);
});

// const firstUser = store.dispatch(
//   addUser({
//     firstName: "Anju",
//     address: "MMMUT",
//     contactNumber: "8354820950",
//     emailId: "anju@gmail.com",
//   })
// );
// const secondUser = store.dispatch(
//   addUser({
//     firstName: "Ravi",
//     address: "Varanasi",
//     contactNumber: "987654321",
//     emailId: "ravi@ncr.com",
//   })
// );
// // // console.log("returned", firstUser);
// const updatedFirstUser = store.dispatch(
//   editUser({
//     id: "1",
//     updates: {
//       firstName: "Aradhana",
//       middleName: "b1",
//       lastName: "Singh",
//       emailId: "Aradhana@gmail.com",
//       address: "MMMEC Gorakhpur",
//       status: "Active",
//     },
//   })
// );
// store.dispatch(removeUser({ id: "1" }));

// const firstUsage = store.dispatch(
//   addUsage({
//     userId: "4",
//     planId: "3",
//     paymentDetails: [
//       {
//         id: uuid(),
//         paidAmount: 8000,
//         paymentMethod: "Credit Card",
//         paymentReferenceId: "a1",
//         paidAt: moment("2020-07-23").valueOf(),
//       },
//     ],
//   })
// );

// const secondUsage = store.dispatch(
//   addUsage({
//     userId: "3",
//     planId: "3",
//     paymentDetails: [
//       {
//         id: uuid(),
//         paidAmount: 3000,
//         paymentMethod: "On-Line",
//         paymentReferenceId: "a1",
//         paidAt: moment("2020-08-23").valueOf(),
//       },
//       {
//         id: uuid(),
//         paidAmount: 2000,
//         paymentMethod: "OCash",
//         paymentReferenceId: "",
//         paidAt: moment("2020-08-02").valueOf(),
//       },
//       {
//         id: uuid(),
//         paidAmount: 5000,
//         paymentMethod: "On-Line",
//         paymentReferenceId: "a1",
//         paidAt: moment("2020-09-22").valueOf(),
//       },
//     ],
//   })
// );
// const thirdUsage = store.dispatch(
//   addUsage({
//     userId: "2",
//     planId: "3",
//     paymentDetails: [],
//   })
// );
// console.log(thirdUsage);

// const firstPayment = store.dispatch(
//   addPayment({
//     userId: "2",
//     usageId: thirdUsage.usage.id,
//     paymentDetail: {
//       paidAmount: 9900,
//       paymentMethod: "onLine",
//       paymentReferenceId: "adf1",
//     },
//   })
// );
// console.log(firstPayment);

// const secondPayment = store.dispatch(
//   addPayment({
//     userId: "2",
//     usageId: thirdUsage.usage.id,
//     paymentDetail: {
//       paidAmount: 9900,
//       paymentMethod: "CASH",
//       paymentReferenceId: "adASDFASDF1",
//     },
//   })
// );
// console.log(secondPayment);

// filters
store.dispatch(setTextFilter({ text: "" }));
store.dispatch(setContactNumberFilter({ contactNumber: "" }));
store.dispatch(setEmailIdFilter({ emailId: "" }));
store.dispatch(setCurrentPlanIdFilter({ currentPlanId: "" }));
store.dispatch(setUserAccountStatusFilter({ userAccountStatus: "" }));
store.dispatch(setIsDueFilter({ isDue: null }));

store.dispatch(setStartDateFilter({ startDate: moment(0).valueOf() }));
store.dispatch(setEndDateFilter({ endDate: moment("2022-01-01").valueOf() }));

// store.dispatch(setSortByFilter({ sortBy: "textAsc" }));
// store.dispatch(setSortByFilter({ sortBy: "dueAmountAsc" }));
store.dispatch(setSortByFilter({ sortBy: "dueDateAsc" }));
