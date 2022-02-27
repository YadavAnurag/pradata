import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { initGetDashboardData } from "../../store/actions/index";
import AdminDashboardPage from "./AdminDashboardPage";
import UserDashboardPage from "./UserDashboardPage";

const Dashboard = (props) => {
  let dashboardJSX = null;
  if (!!!props.userId) {
    console.log("1");
    dashboardJSX = <Redirect to="/" />;
  } else {
    console.log("2");
    if (props.isAdmin) {
      console.log("3");
      dashboardJSX = <AdminDashboardPage />;
    } else {
      console.log("4");
      dashboardJSX = <UserDashboardPage />;
    }
  }

  return <div>{dashboardJSX}</div>;
};

const mapStateToProps = (state) => {
  return {
    isAdmin: state.auth.isAdmin,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onInitGetDashboardData: (id) => dispatch(initGetDashboardData(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
