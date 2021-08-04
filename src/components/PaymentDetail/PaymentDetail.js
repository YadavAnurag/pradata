import React from "react";
import moment from "moment";

const PaymentDetail = (props) => {
  const { id, paidAmount, paymentMethod, paymentReferenceId, paidAt } =
    props.paymentDetail;

  return (
    <div>
      <h3>Payment Detail </h3>
      <p>id: {id}</p>
      <p>paidAmount: &#8377;{paidAmount / 100}</p>
      <p>paymentMethod: {paymentMethod}</p>
      <p>PaymentReferenceId:{paymentReferenceId}</p>
      <p>paidAt: {moment(paidAt).format("D-MMM-YYYY")}</p>
    </div>
  );
};

export default PaymentDetail;
