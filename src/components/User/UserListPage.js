import React from "react";
import { connect } from "react-redux";

import UserList from "./UserList";
import { getSelectedUsers } from "../../store/selectors/index";
import UserFilters from "../Filter/UserFilters";

const UserListPage = (props) => {
  return (
    <div>
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
