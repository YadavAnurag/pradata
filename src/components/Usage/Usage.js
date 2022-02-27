import React from "react";
import moment from "moment";
import PaymentDetailList from "../PaymentDetail/PaymentDetailList";
import { Link } from "react-router-dom";
import { getUsagePaymentDetails } from "../../store/utility/utility";

import Accordion from "../UI/Accordion/Accordion";

const Usage = (props) => {
  const { id, planId, startedAt, paymentDetails } = props.usage;
  const planName = props.plans.filter((plan, key) => plan.id === planId)[0]
    .title;

  console.log(planName, "[AddPaymentPage.js] - props.user", props);
  const isAdmin = JSON.parse(localStorage.getItem("auth")).isAdmin;

  return (
    <div>
      <div className="list-item-top">
        <p className="plan__status-value">Usage</p>
        {isAdmin && (
          <Link
            to={`/users/add-payment?userId=${props.user.id}&usageId=${id}`}
            className="list-item-top__usage-link"
          >
            Add Payment
          </Link>
        )}
      </div>

      <div className="user-list-item">
        <div className="list-item__user-details">
          <div>
            <p>Total Due:</p>
            <p>
              &#8377;&nbsp;
              {getUsagePaymentDetails({
                usage: props.usage,
                plans: props.plans,
              }).totalDueToThisUsage / 100}
            </p>
          </div>
          <div>
            <p>Plan:</p>
            <p>{planName === undefined ? "XXXX" : planName}</p>
          </div>
          <div>
            <p>Last Renewed:</p>
            <p>{moment(startedAt).format("DD-MMM-YYYY")}</p>
          </div>
        </div>
      </div>
      <Accordion
        title={
          <div className="item-details">
            <h4>Payment Details: </h4>
          </div>
        }
      >
        <PaymentDetailList paymentDetails={paymentDetails} />
      </Accordion>
    </div>
  );
};

export default Usage;
