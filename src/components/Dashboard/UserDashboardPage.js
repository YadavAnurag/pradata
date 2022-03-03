import React from "react";

import {Redirect} from "react-router-dom";
import UserDashboard from "./UserDashboard";
import User from "../User/User";
import UsageList from "../Usage/UsageList";
import { getUserFullName } from "../../store/utility/utility";

const UserDashboardPage = (props) => {
  // const jsx = (

  // );
  return (
    <div>
      {props.userId === "" ? (
        <Redirect to="/" />
      ) : (
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
      )}
    </div>
  )
};

export default UserDashboardPage;
