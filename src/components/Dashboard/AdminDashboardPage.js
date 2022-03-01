import React from "react";
import AdminDashboard from "./AdminDashboard";
import User from "../User/User";

const AdminDashboardPage = (props) => {
  return (
    <div className="content-container">
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">Admin Dashboard</h1>
        </div>
      </div>

      <div>
        <AdminDashboard dashboardData={props.adminDashboardDataObject} />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
