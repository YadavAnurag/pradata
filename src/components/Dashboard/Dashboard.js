import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { initGetDashboardData, initSetUsers, initSetPlans } from "../../store/actions/index";
import AdminDashboardPage from "./AdminDashboardPage";
import UserDashboardPage from "./UserDashboardPage";

const Dashboard = (props) => {
  console.log("Came here", props.users);

  const [fetchedUserDashboardData, setFetchedUserDashboardData] = useState(props.userDashboardData.length !== 0);
  const [fetchedAdminDashboardData, setFetchedAdminDashboardData] = useState(Object.keys(props.adminDashboardData).length !== 0);
  React.useEffect(() => {
    if (!props.isAdmin) {
      if (!fetchedUserDashboardData) {
        props.onInitGetDashboardData(props.userId, props.isAdmin).then(() => setFetchedUserDashboardData(true));
      }
    } else {
      if (!fetchedAdminDashboardData) {
        props.onInitGetDashboardData(props.userId, props.isAdmin).then(() => setFetchedAdminDashboardData(true));
      }
    }
  }, [fetchedUserDashboardData, fetchedAdminDashboardData]);


  const [fetchedUsers, setFetchedUsers] = useState(props.users.length !== 0);
  const [fetchedPlans, setFetchedPlans] = useState(props.plans.length !== 0);
  useEffect(() => {
    if(!fetchedUsers){
      props.onInitSetUsers().then(() => setFetchedUsers(true));
    }
    if(!fetchedPlans){
      props.onInitSetPlans().then(() => setFetchedPlans(true));
    }
  }, [fetchedUsers, fetchedPlans]);


  let dashboardJSX = null;
  if (!!!props.userId) {
    dashboardJSX = <Redirect to="/" />;
  } else {
    if (props.isAdmin) {
      dashboardJSX = (
        (Object.keys(props.adminDashboardData).length !== 0) ? (<AdminDashboardPage
          adminDashboardDataObject={props.adminDashboardData}
          user={props.user}
          userId={props.userId}
        />) : (<p>Loading...</p>)
      );
    } else {
      dashboardJSX = (
        (props.userDashboardData.length !== 0) ? (
          <UserDashboardPage
            userDashboardDataArray={props.userDashboardData}
            user={props.user}
            userId={props.userId}
        />
        ) : (<p>Loading...</p>)
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
    plans: state.plans
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onInitGetDashboardData: (id, isAdmin) =>
      dispatch(initGetDashboardData(id, isAdmin)),
    onInitSetUsers: () => dispatch(initSetUsers()),
    onInitSetPlans: () => dispatch(initSetPlans())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
