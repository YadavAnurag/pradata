import React from "react";
import moment from "moment";
import PaymentDetailList from "../PaymentDetail/PaymentDetailList";
import { Link } from "react-router-dom";

const Usage = (props) => {
  const { id, planId, startedAt, paymentDetails } = props.usage;

  return (
    <div>
      <h3>Usage</h3>
      <Link to={`/users/add-payment?userid=${props.userId}&usageid=${id}`}>
        {" "}
        Add Payment{" "}
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
