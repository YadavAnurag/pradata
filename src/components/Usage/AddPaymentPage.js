import React from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import queryString from "query-string";
import { toast } from "react-toastify";

import { initAddPayment } from "../../store/actions/index";
import {
  getUserFullName,
  getUsagePaymentDetails,
} from "../../store/utility/utility";
import PaymentForm from "./PaymentForm";
import moment from "moment";

export const AddPaymentPage = (props) => {
  const history = useHistory();
  const { userId, usageId } = queryString.parse(history.location.search);
  const user = props.users.find(({ id }) => id === userId);
  const usage = user.usages.find(({ id }) => id === usageId);

  const {
    totalDueToThisUsage,
    totalPaidAmountToThisUsage,
    planDueDateToThisUsage,
    planName,
    planPrice,
  } = getUsagePaymentDetails({ usage, plans: props.plans });

  const onSubmit = (paymentDetail) => {
    props
      .onInitAddPayment(userId, usageId, paymentDetail)
      .then(() => {
        toast.success("Payment Added Successfully");
        history.goBack();
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  // if no due then display no payment required jsx
  console.log("totalDueToThisUsage", totalDueToThisUsage);
  const jsx =
    totalDueToThisUsage <= 0 ? (
      <div>
        <h3>No Payment Required, all dues already settled </h3>
      </div>
    ) : (
      <PaymentForm
        onSubmit={onSubmit}
        planId={props.plans.find(({ id }) => id === usage.planId).id}
        plans={props.plans}
        dueAmount={totalDueToThisUsage}
      />
    );

  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <div className="page-header__title">
            <h1>Add Payment</h1>
          </div>
          <div>
            <p>
              Name:
              {
                getUserFullName({
                  firstName: user.firstName,
                  middleName: user.middleName,
                  lastName: user.lastName,
                }).fullName
              }
            </p>
            <p>Contact Number: {user.contactNumber}</p>
            <p>EmailId: {user.emailId}</p>
            <p>Account Status: {user.status}</p>
          </div>
        </div>
      </div>
      <br />
      <div className="content-container">
        <div>
          <p>Plan: {planName}</p>
          <p>Renewed At: {moment(usage.startedAt).format()}</p>
          <p>Plan Due Date: {moment(planDueDateToThisUsage).format()}</p>
          <p>Price: &#8377;{planPrice / 100}</p>
          <p>
            Total Payment Received : &#8377;{totalPaidAmountToThisUsage / 100}
          </p>
          <p>Amount Due: &#8377;{totalDueToThisUsage / 100}</p>
        </div>
        <div>{jsx}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    plans: state.plans,
    users: state.users,
  };
};
const mapDispatchToProps = (dispatch) => ({
  onInitAddPayment: (userId, usageId, paymentDetail) => {
    return dispatch(initAddPayment({ userId, usageId, paymentDetail }));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(AddPaymentPage);
