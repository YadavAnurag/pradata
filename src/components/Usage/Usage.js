import React from "react";

import moment from "moment";
import PaymentDetailList from "../PaymentDetail/PaymentDetailList";

const Usage = (props) => {
  const { id, planId, startedAt, paymentDetails } = props.usage;

  return (
    <div>
      <p>id: {id}</p>
      <p>planId: {planId}</p>
      <p>Recharged On: {moment(startedAt).format()}</p>
      <p>paymentDetails: {paymentDetails.length}</p>
      <PaymentDetailList paymentDetails={paymentDetails} />
      <br /> <br />
    </div>
  );
};

export default Usage;
