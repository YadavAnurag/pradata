import React from "react";
import moment from "moment";

const PaymentDetail = (props) => {
  const { paidAmount, paymentMethod, paymentReferenceId, paidAt } =
    props.paymentDetail;

  return (
    <div>
      <div className="user-list-item">
        <div className="list-item__user-details payment-details">
          <div>
            <p>Paid Amount: </p>
            <p>&#8377;&nbsp;{paidAmount / 100}</p>
          </div>

          <div>
            <p>Payment Method:</p>
            <p>{paymentMethod}</p>
          </div>
          <div>
            <p>Payment Reference Id:</p>
            <p>{paymentReferenceId}</p>
          </div>
          <div>
            <p>Paid At:</p>
            <p>{moment(paidAt).format("DD-MMM-YYYY")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetail;
