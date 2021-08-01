import React from "react";

import Payment from "./PaymentDetail";

const PaymentDetailList = (props) => {
  return (
    <div>
      {props.paymentDetails.map((paymentDetail) => {
        return (
          <div>
            <Payment paymentDetail={paymentDetail} />
          </div>
        );
      })}
    </div>
  );
};

export default PaymentDetailList;
