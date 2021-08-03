import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getSelectedUsers } from "../../store/selectors/user";

const UsersSummary = (props) => {
  const { userCount } = props;
  const userWord = userCount === 1 ? "user" : "users";

  return (
    <div>
      <h3>
        Viewing <span>{userCount}</span> {userWord}
      </h3>
      <div>
        <Link to="/users/add">Add User</Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const selectedUsers = getSelectedUsers(
    state.users,
    state.plans,
    state.userFilters
  );

  return {
    userCount: selectedUsers.length,
  };
};
export default connect(mapStateToProps)(UsersSummary);
