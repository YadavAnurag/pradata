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

import User from "../User/User";
import CurrentUsage from "./CurrentUsage";

export const AddPaymentPage = (props) => {
  const history = useHistory();
  const { userId, usageId } = queryString.parse(history.location.search);
  const user = props.users.find(({ id }) => id === userId);
  const usage = user.usages.find(({ id }) => id === usageId);

  const currentUsage = getUsagePaymentDetails({ usage, plans: props.plans });

  const toastId = React.useRef(null);
  const onSubmit = (paymentDetail) => {
    toastId.current = toast.loading("Saving Payment...");
    props
      .onInitAddPayment(userId, usageId, paymentDetail)
      .then((payload) => {
        if (payload.error !== null) {
          toast.dismiss(toastId.current);
          toast.error(payload.msg, { delay: 300 });
        } else {
          toast.dismiss(toastId.current);
          toast.success("Payment Saved", { delay: 300 });
          history.goBack();
        }
      })
      .catch((err) => {
        toast.dismiss(toastId.current);
        toast.error(err.message);
      });
  };

  // if no due then display no payment required jsx
  const totalDueToThisUsage = currentUsage.totalDueToThisUsage;
  const jsx =
    totalDueToThisUsage <= 0 ? (
      <div className="payment-status">
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
          <User user={user} />
          <CurrentUsage currentUsage={currentUsage} />
          <div>{jsx}</div>
        </div>
      </div>
      <br />
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
