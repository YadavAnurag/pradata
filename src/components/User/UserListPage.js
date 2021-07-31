import React from "react";
import { connect } from "react-redux";

import UserList from "./UserList";

const UserListPage = (props) => {
  return (
    <div>
      <UserList users={props.users} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};
export default connect(mapStateToProps)(UserListPage);
