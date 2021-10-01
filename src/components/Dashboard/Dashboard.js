import React from "react";
import { connect } from "react-redux";

import { initGetDashboardData } from "../../store/actions/index";

const Dashboard = (props) => {
  return (
    <div>
      <p>
        Dashboard Page for {props.userId} and is{" "}
        {props.isAdmin === true ? "admin" : "normal user"}
      </p>
    </div>
  );
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
