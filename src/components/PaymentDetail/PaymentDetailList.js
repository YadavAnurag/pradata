import React from "react";

import Payment from "./PaymentDetail";

const PaymentDetailList = (props) => {
  return (
    <div>
      {props.paymentDetails.map((paymentDetail, key) => {
        return <Payment key={key} paymentDetail={paymentDetail} />;
      })}
    </div>
  );
};

export default PaymentDetailList;
