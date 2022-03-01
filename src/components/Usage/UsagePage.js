import React from "react";
import { useParams, useLocation, useHistory } from "react-router";
import queryString from "query-string";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import UsageList from "./UsageList";
import User from "../User/User";
import { getSelectedUsers } from "../../store/selectors/index";
import { getUserFullName } from "../../store/utility/utility";

const UsagePage = (props) => {
  const location = useLocation();
  const { userId } = queryString.parse(location.search);
  const user = props.users.find((user) => {
    return user.id === userId;
  });
  const usages = user.usages;

  return (
    <div className="content-container">
      <User user={user} />
      {props.isAdmin && (
        <div className="header-buttons">
          <Link to={`/users/edit?id=${userId}`} className="button">
            Edit
          </Link>
          <Link to={`/users/renew?userId=${userId}`} className="button">
            Renew Plan
          </Link>
        </div>
      )}
      <div className="list-header">
        <div className="show-for-desktop">All Usages</div>
      </div>
      <UsageList usages={usages} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    isAdmin: state.auth.isAdmin,
  };
};
export default connect(mapStateToProps)(UsagePage);
