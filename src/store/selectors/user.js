import moment from "moment";
import {
  getTotalPaymentReceivedToLastUsage,
  getUserFullName,
} from "../utility/utility";

export const getSelectedUsers = (users, plans, userFilters) => {
  const {
    text = "",
    emailId = "",
    contactNumber = "",
    currentPlanId = "",
    userAccountStatus = "",
    isDue = true,
    sortBy = "textAsc",
    startDate = moment().startOf("month").valueOf(),
    endDate = moment().endOf("month").valueOf(),
    isAdmin = false,
  } = { ...userFilters };

  return users
    .filter((user) => {
      const {
        totalPaymentReceived,
        dueAmount,
        currentPlan,
        currentPlanDueDate,
        userInDue,
      } = getTotalPaymentReceivedToLastUsage(user, plans);

      // textMatch
      const textMatch = getUserFullName(user)
        .fullName.toLowerCase()
        .includes(text.toLowerCase());

      // emailIdMatch
      const emailIdMatch = user.emailId
        .toLowerCase()
        .includes(emailId.toLowerCase());

      // contactNumberMatch
      const contactNumberMatch = user.contactNumber.includes(contactNumber);

      // currentPlanIdMatch
      const currentPlanIdMatch = currentPlan.id
        .toLowerCase()
        .includes(currentPlanId.toLowerCase());
      const userAccountStatusMatch = !!userAccountStatus
        ? user.status.toLowerCase() === userAccountStatus.toLowerCase()
        : true;

      // isDueMatch
      /*
       initialize isDueMatch as true, because if no dues for a user, 
       then don't exclude this user, have to include this user so mark match as true
      */

      let isDueMatch = true;
      if (isDue !== null) {
        //if user has any due or not
        if (isDue === true) {
          isDueMatch = userInDue === true ? true : false;
        } else {
          isDueMatch = userInDue === false ? true : false;
        }
      } else {
        isDueMatch = true;
      }

      // +startDateMatch and endDateMatch with user due date
      let startDateMatch = false,
        endDateMatch = false;
      // calculation of userPlanDueDate
      // let userPlanDueDate = null;
      if (isDue !== null) {
        startDateMatch = currentPlanDueDate >= startDate;
        endDateMatch = currentPlanDueDate <= endDate;
      } else {
        // get all either having due or no-dues
        startDateMatch = true;
        endDateMatch = true;
      }

      // return only non admin user
      const isNotAdminMatch = user.auth.isAdmin === false;

      return (
        textMatch &&
        contactNumberMatch &&
        emailIdMatch &&
        currentPlanIdMatch &&
        userAccountStatusMatch &&
        isDueMatch &&
        startDateMatch &&
        endDateMatch &&
        isNotAdminMatch
      );
    })
    .sort((firstUser, secondUser) => {
      if (sortBy.includes("text")) {
        const { fullName: firstUserFullName } = getUserFullName(firstUser);
        const { fullName: secondUserFullName } = getUserFullName(secondUser);

        return sortBy === "textAsc"
          ? firstUserFullName.toLowerCase() > secondUserFullName.toLowerCase()
          : firstUserFullName.toLowerCase() < secondUserFullName.toLowerCase();
      } else if (sortBy.includes("dueAmount")) {
        const { dueAmount: firstUserDueAmount } =
          getTotalPaymentReceivedToLastUsage(firstUser, plans);
        const { dueAmount: secondUserDueAmount } =
          getTotalPaymentReceivedToLastUsage(secondUser, plans);

        return sortBy === "dueAmountAsc"
          ? firstUserDueAmount - secondUserDueAmount
          : secondUserDueAmount - firstUserDueAmount;
      } else if (sortBy.includes("dueDate")) {
        const { currentPlanDueDate: firstUserCurrentPlanDueDate } =
          getTotalPaymentReceivedToLastUsage(firstUser, plans);
        const { currentPlanDueDate: secondUserCurrentPlanDueDate } =
          getTotalPaymentReceivedToLastUsage(secondUser, plans);

        return sortBy === "dueDateAsc"
          ? firstUserCurrentPlanDueDate - secondUserCurrentPlanDueDate
          : secondUserCurrentPlanDueDate - firstUserCurrentPlanDueDate;
      } else {
        return 0;
      }
    });
};
