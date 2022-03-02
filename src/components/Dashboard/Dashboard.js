import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { initGetDashboardData, initSetUsers } from "../../store/actions/index";
import AdminDashboardPage from "./AdminDashboardPage";
import UserDashboardPage from "./UserDashboardPage";

const Dashboard = (props) => {
  React.useEffect(() => {
    if (Object.keys(props.users).length === 0) {
      props.onInitSetUsers();
    }

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
    dashboardJSX = <Redirect to="/" />;
  } else {
    if (props.isAdmin) {
      dashboardJSX = (
        <AdminDashboardPage
          adminDashboardDataObject={props.adminDashboardData}
          user={props.user}
        />
      );
    } else {
      dashboardJSX = (
        <UserDashboardPage
          userDashboardDataArray={props.userDashboardData}
          user={props.user}
        />
      );
    }
  }

  return <div style={{ paddingBottom: "4rem" }}>{dashboardJSX}</div>;
};

const mapStateToProps = (state) => {
  return {
    isAdmin: state.auth.isAdmin,
    userId: state.auth.userId,
    userDashboardData: state.userDashboard,
    adminDashboardData: state.adminDashboard,
    user: state.users.find(({ id }) => id === state.auth.userId),
    users: state.users,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onInitGetDashboardData: (id, isAdmin) =>
      dispatch(initGetDashboardData(id, isAdmin)),
    onInitSetUsers: () => dispatch(initSetUsers()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
