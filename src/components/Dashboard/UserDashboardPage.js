import React from "react";

import UserDashboard from "./UserDashboard";
import User from "../User/User";
import UsageList from "../Usage/UsageList";
import { getUserFullName } from "../../store/utility/utility";

const UserDashboardPage = (props) => {
  return (
    <div className="content-container">
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">Personal Dashboard</h1>
        </div>
        <User user={props.user} editUser={props.onInitEditUser} />
        {/* <UsageList usages={props.user.usages} /> */}
      </div>

      <div>
        {props.userDashboardDataArray
          .slice(0)
          .reverse()
          .map((dashboardData, key) => (
            <UserDashboard key={key} dashboardData={dashboardData} />
          ))}
      </div>
    </div>
  );
};

export default UserDashboardPage;
