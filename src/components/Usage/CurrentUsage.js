import React from "react";
import moment from "moment";

const CurrentUsage = (props) => {
  const {
    totalDueToThisUsage,
    totalPaidAmountToThisUsage,
    planDueDateToThisUsage,
    planName,
    planPrice,
  } = props.currentUsage;

  return (
    <div className="user-list-item">
      <div className="list-item__user-details list-item__current-usage">
        <div>
          <p>Plan Price:</p>
          <p>{planPrice / 100}</p>
        </div>
        <div>
          <p>Paid Amount:</p>
          <p>{totalPaidAmountToThisUsage / 100}</p>
        </div>
        <div>
          <p>Current Due:</p>
          <p>
            &#8377;&nbsp;
            {totalDueToThisUsage / 100}
          </p>
        </div>

        <div>
          <p>Plan Due:</p>
          <p>{moment(planDueDateToThisUsage).format("DD-MMM-YYYY")}</p>
        </div>
        <div>
          <p>Plan Name:</p>
          <p>{planName}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentUsage;
