export const mergedObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

// TODO - optimize below function using switch-case by using variables needed object as parameter to this function
export const getTotalPaymentReceivedToLastUsage = (user, plans) => {
  let userInDue = false,
    dueAmount = 0;
  let totalPaymentReceived = 0,
    currentPlanDueDate = 1e13; // a large number, please do not use Infinity javascript sort function doesn't work on Infinity
  /* 
      there are no usages means there is no currentPlan
      so create a fake plan for login comparison and other things
    */
  let currentPlan = {
    id: "",
    title: "",
    price: 0,
    status: "",
    description: "",
    validityPeriod: 1e13,
    createdAt: 1e13,
  };

  // if there any usages,
  if (user.usages.length) {
    const userLastUsage = user.usages[user.usages.length - 1];

    // If any payment received
    if (userLastUsage.paymentDetails.length) {
      // calculate total payment received
      totalPaymentReceived = userLastUsage.paymentDetails.reduce(
        (totalPaidAmount, payment) => totalPaidAmount + payment.paidAmount,
        0
      );

      // calculate current plan
      currentPlan = plans.find((plan) => plan.id === userLastUsage.planId);

      // calculate current plan due date
      currentPlanDueDate = userLastUsage.startedAt + currentPlan.validityPeriod;

      // calculate dueAmount based on current plan
      dueAmount = currentPlan.price - totalPaymentReceived;

      // update userInDue based on dueAmount calculation
      userInDue = dueAmount > 0 ? true : false;
    } else {
      // user has usage but no payment received
      userInDue = true;
    }
  } else {
    // there are no usages
    userInDue = false;
  }

  return {
    totalPaymentReceived,
    dueAmount,
    currentPlan,
    currentPlanDueDate,
    userInDue,
  };
};

// get user full name
export const getUserFullName = (user) => {
  const nameArray = [];

  // check if user has properties
  if (user.hasOwnProperty("firstName")) nameArray[0] = user.firstName;
  if (user.hasOwnProperty("middleName")) nameArray[1] = user.middleName;
  if (user.hasOwnProperty("lastName")) nameArray[2] = user.lastName;

  const fullName = nameArray.join(" ");
  const fullNameArray = fullName.split(" ");

  for (var iterator = 0; iterator < fullNameArray.length; iterator++) {
    fullNameArray[iterator] =
      fullNameArray[iterator].charAt(0).toUpperCase() +
      fullNameArray[iterator].slice(1);
  }

  // join all capitalized words for full capitalized name
  return { fullName: fullNameArray.join(" ") };
};

export const getUsagePaymentDetails = ({ usage = {}, plans = [] }) => {
  //return - totalDueToThisUsage, totalPaidAmountToThisUsage,
  // planNameToThisUsage, planDueDateToThisUsage

  let totalDueToThisUsage = 0,
    totalPaidAmountToThisUsage = 0,
    planDueDateToThisUsage = 1e13; // Please don't use Infinity, javascript sort method doesn't work with Infinity

  let planToThisUsage = {};

  /* calculate totalPaidAmountToThisUsage
  if usage.paymentDetails.length === 0
    totalPaidAmountToThisUsage = 0
  else
    use reducer to calculate total payment received
  */

  if (Object.keys(usage).length) {
    if (usage.paymentDetails.length) {
      totalPaidAmountToThisUsage = usage.paymentDetails.reduce(
        (totalPaidAmount, paymentDetail) =>
          totalPaidAmount + paymentDetail.paidAmount,
        0
      );
    } else {
      totalPaidAmountToThisUsage = 0;
    }

    planToThisUsage = plans.find(({ id }) => id === usage.planId);
  } else {
    totalPaidAmountToThisUsage = 0;
  }

  totalDueToThisUsage = planToThisUsage.price - totalPaidAmountToThisUsage;
  totalDueToThisUsage = totalDueToThisUsage < 0 ? 0 : totalDueToThisUsage;

  planDueDateToThisUsage = usage.startedAt + planToThisUsage.validityPeriod;

  return {
    totalDueToThisUsage,
    totalPaidAmountToThisUsage,
    planDueDateToThisUsage,
    planName: planToThisUsage.title === undefined ? "" : planToThisUsage.title,
    planPrice: planToThisUsage.price === undefined ? "" : planToThisUsage.price,
  };
};
