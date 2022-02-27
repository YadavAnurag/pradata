import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { initGetDashboardData } from "../../store/actions/index";
import AdminDashboardPage from "./AdminDashboardPage";
import UserDashboardPage from "./UserDashboardPage";

const Dashboard = (props) => {
  React.useEffect(() => {
    if (props.isAdmin) {
      if (props.userDashboardData.length === 0) {
        props.onInitGetDashboardData(props.userId, props.isAdmin);
      }
    } else {
      if (Object.keys(props.adminDashboardData).length === 0) {
        props.onInitGetDashboardData(props.userId, props.isAdmin);
      }
    }
  }, []);

  let dashboardJSX = null;
  if (!!!props.userId) {
    console.log("1");
    dashboardJSX = <Redirect to="/" />;
  } else {
    console.log("2");
    if (props.isAdmin) {
      console.log("3");
      dashboardJSX = (
        <AdminDashboardPage
          adminDashboardDataObject={props.adminDashboardData}
          user={props.user}
        />
      );
    } else {
      console.log("4");
      dashboardJSX = (
        <UserDashboardPage
          userDashboardDataArray={props.userDashboardData}
          user={props.user}
        />
      );
    }
  }

  return <div>{dashboardJSX}</div>;
};

const mapStateToProps = (state) => {
  return {
    isAdmin: state.auth.isAdmin,
    userId: state.auth.userId,
    userDashboardData: state.userDashboard,
    adminDashboardData: state.userDashboard,
    user: state.users.find(({ id }) => id === state.auth.userId),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onInitGetDashboardData: (id, isAdmin) =>
      dispatch(initGetDashboardData(id, isAdmin)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
