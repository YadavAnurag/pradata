import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

import { initEditUser } from "../../store/actions/index";
import Profile from "./Profile";

const ProfilePage = (props) => {
  // fetch user
  const userId = props.userId;
  const user = props.users.find(({ id }) => id === userId);
  console.log(userId, user);

  const jsx =
    user === undefined ? (
      <div>
        <p>No such user...!</p>
      </div>
    ) : (
      <div>
        <Profile user={user} editUser={props.onInitEditUser} />
      </div>
    );

  return { ...jsx };
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onInitEditUser: (id, updates) => dispatch(initEditUser({ id, updates })),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
