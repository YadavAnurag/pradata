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
  console.log("This one", userId, location.search, props.users);
  const user = props.users.find((user) => {
    console.log(user);
    return user.id === userId;
  });
  const usages = user.usages;

  return (
    <div className="content-container">
      <User user={user} />
      <div className="header-buttons">
        <Link to={`/users/edit?id=${userId}`} className="button">
          Edit
        </Link>
        <Link to={`/users/renew?userId=${userId}`} className="button">
          Renew Plan
        </Link>
      </div>
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
  };
};
export default connect(mapStateToProps)(UsagePage);
