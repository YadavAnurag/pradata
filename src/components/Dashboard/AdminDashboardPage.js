import React from "react";
import AdminDashboard from "./AdminDashboard";
import User from "../User/User";

const AdminDashboardPage = (props) => {
  console.log("x - adminDashboardDataObject", props.adminDashboardDataObject);
  return (
    <div className="content-container">
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">Admin Dashboard</h1>
        </div>
        {/* <User user={props.user} editUser={props.onInitEditUser} /> */}
        {/* <UsageList usages={props.user.usages} /> */}
      </div>

      <div>
        <AdminDashboard dashboardData={props.adminDashboardDataObject} />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
