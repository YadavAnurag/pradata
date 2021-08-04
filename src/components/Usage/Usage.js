import React from "react";
import moment from "moment";
import PaymentDetailList from "../PaymentDetail/PaymentDetailList";
import { Link } from "react-router-dom";
import { getUsagePaymentDetails } from "../../store/utility/utility";

const Usage = (props) => {
  const { id, planId, startedAt, paymentDetails } = props.usage;

  console.log("[AddPaymentPage.js] - props.user", props);
  return (
    <div>
      <h3>Usage</h3>
      <p>
        Total Due: &#8377;
        {getUsagePaymentDetails({ usage: props.usage, plans: props.plans })
          .totalDueToThisUsage / 100}
      </p>
      <Link to={`/users/add-payment?userid=${props.user.id}&usageid=${id}`}>
        Add Payment
      </Link>
      <p>id: {id}</p>
      <p>planId: {planId}</p>
      <p>Recharged On: {moment(startedAt).format()}</p>
      <p>paymentDetails: {paymentDetails.length}</p>
      <h3>Payment Details</h3>
      <PaymentDetailList paymentDetails={paymentDetails} />
      <br /> <br />
    </div>
  );
};

export default Usage;
