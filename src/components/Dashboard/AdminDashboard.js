import React from "react";

const AdminDashboard = (props) => {
  const {
    dueDatePassedForAllUsersCount,
    dueDateWithInAMonthForAllUsersCount,
    numberOfActiveUsers,
    numberOfInactiveUsers,
    totalDuesSinceLastOneYearForAllUsersCount,
    totalUsers,
  } = props.dashboardData;

  return (
    <div className="content-container">
      <div className="list-item-top">
        <p className="plan__status-value">Information</p>
        {/* <p className="plan__status-value">Usage</p> */}
      </div>
      <div className="user-list-item">
        <div className="list-item__user-details">
          <div>
            <p>Total Users :</p>
            <p>{totalUsers.toString()}</p>
          </div>
          <div>
            <p>Active Users : </p>
            <p>{numberOfActiveUsers.toString()}</p>
          </div>
          <div>
            <p>Inactive Users :</p>
            <p>{numberOfInactiveUsers.toString()}</p>
          </div>
          <div>
            <p>Due Date Passed Users :</p>
            <p>{dueDatePassedForAllUsersCount.toString()}</p>
          </div>
          <div>
            <p>Due Date in 30 Days Users :</p>
            <p>{dueDateWithInAMonthForAllUsersCount.toString()}</p>
          </div>

          <div>
            <p>Total Due in last 1 Year :</p>
            <p>{(totalDuesSinceLastOneYearForAllUsersCount / 100).toString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
