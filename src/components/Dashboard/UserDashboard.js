import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import Accordion from "../UI/Accordion/Accordion";
import Plan from "../Plan/Plan";

const UserDashboard = (props) => {
  const {
    isPlanActive,
    isDueDatePassed,
    totalDue,
    planDueDate,
    planValidityPeriod,
    plan,
  } = props.dashboardData;

  return (
    <div className="content-container">
      <div className="list-item-top">
        <p className="plan__status-value">
          {isPlanActive ? "Active Plan" : "Inactive"}
        </p>
        {/* <p className="plan__status-value">Usage</p> */}
      </div>
      <div className="user-list-item">
        <div className="list-item__user-details">
          <div>
            <p>Plan:</p>
            <p>{plan.title === undefined ? "XXXX" : plan.title}</p>
          </div>
          <div>
            <p>Plan Validity</p>
            <p>
              {moment.duration(planValidityPeriod, "milliseconds").asDays()}{" "}
              Days
            </p>
          </div>
          <div>
            <p>Due Date: </p>
            <p>
              {isDueDatePassed
                ? moment(planDueDate).format("DD-MM-YYYY")
                : moment(planDueDate).format("DD-MM-YYYY")}
            </p>
          </div>
          <div>
            <p>Payment Due:</p>
            <p>
              &#8377;&nbsp;
              {totalDue / 100}
            </p>
          </div>
        </div>
      </div>
      <Accordion
        title={
          <div className="item-details">
            <h4>Plan Details: </h4>
          </div>
        }
      >
        <Plan plan={plan} onRemove={() => {}} />
      </Accordion>
    </div>
  );
};

export default UserDashboard;
