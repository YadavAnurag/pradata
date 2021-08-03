import React from "react";
import { connect } from "react-redux";

import UserList from "./UserList";
import { getSelectedUsers } from "../../store/selectors/index";
import UserFilters from "../Filter/UserFilters";
import UsersSummary from "./UsersSummary";

const UserListPage = (props) => {
  return (
    <div>
      <UsersSummary />
      <UserFilters />
      <p>Total Users: {props.users.length}</p>
      <UserList users={props.users} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: getSelectedUsers(state.users, state.plans, state.userFilters),
  };
};
export default connect(mapStateToProps)(UserListPage);
