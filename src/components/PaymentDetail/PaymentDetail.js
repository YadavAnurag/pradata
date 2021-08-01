import React from "react";
import moment from "moment";

const PaymentDetail = (props) => {
  const { id, paidAmount, paymentMethod, paymentReferenceId, paidAt } =
    props.paymentDetail;

  return (
    <div>
      <p>id: {id}</p>
      <p>paidAmount: {paidAmount}</p>
      <p>paymentMethod: {paymentMethod}</p>
      <p>
        PaymentReferenceId:{" "}
        {paymentMethod === "cash" ? "Please Use BHIM App" : paymentReferenceId}
      </p>
      <p>paidAt: {moment(paidAt).format("D-MMM-YYYY")}</p>
    </div>
  );
};

export default PaymentDetail;
