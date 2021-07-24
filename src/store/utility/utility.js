export const mergedObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const getTotalPaymentReceivedToLastUsage = (user, plans) => {
  let userInDue = false;
  let totalPaymentReceived = 0,
    currentPlanDueDate = 0,
    currentPlan = {};

  // if there is any usage,
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

      userInDue = totalPaymentReceived < currentPlan.price;
    } else {
      // if no payment received
      userInDue = true;
    }
  } else {
    // there are no usages
    userInDue = false;
  }

  return {
    totalPaymentReceived: totalPaymentReceived,
    currentPlanPrice: currentPlan.price,
    currentPlanDueDate: currentPlanDueDate,
    userInDue: userInDue,
  };
};
