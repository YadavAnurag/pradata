import React from "react";
import queryString from "query-string";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import UsageList from "../Usage/UsageList";
import User from "../User/User";

const UserPayment = (props) => {
  const user = props.users.find((user) => {
    console.log(user);
    return user.id === props.userId;
  });
  const usages = user.usages;

  return (
    <div className="content-container">
      <div className="list-header">
        <div className="show-for-desktop">All Usages</div>
      </div>
      <UsageList usages={usages} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    users: state.users,
  };
};
export default connect(mapStateToProps)(UserPayment);
