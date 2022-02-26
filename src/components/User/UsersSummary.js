import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getSelectedUsers } from "../../store/selectors/user";

const UsersSummary = (props) => {
  const { usersCount, users } = props;
  const userWord = usersCount === 1 ? "user" : "users";

  // count non-admin hidden users
  const totalUsers = users.length;
  let adminUsersCount = 0;
  users.map(({ isAdmin }) => {
    if (isAdmin) adminUsersCount++;
  });
  const hiddenUsersCount =
    usersCount < totalUsers - adminUsersCount
      ? totalUsers - adminUsersCount - usersCount
      : 0;

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{usersCount}</span> {userWord}
        </h1>
        <h3>
          hidden <span>{usersCount}</span> {userWord}
          {hiddenUsersCount > 0 && <span>, hidden {hiddenUsersCount}</span>}
        </h3>
        <div className="page-header__actions">
          <Link to="/users/add" className="button">
            Add User
          </Link>
        </div>
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
    usersCount: selectedUsers.length,
    users: state.users,
  };
};
export default connect(mapStateToProps)(UsersSummary);
