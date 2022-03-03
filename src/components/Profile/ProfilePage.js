import React from "react";
import { connect } from "react-redux";

import { initEditUser } from "../../store/actions/index";
import Profile from "./Profile";
import { Redirect } from "react-router-dom/";

import { getUserFullName } from "../../store/utility/utility";

const ProfilePage = (props) => {
  // fetch user
  const user = props.users.find(({ id }) => id === props.userId);

  const jsx =
    props.userId === undefined || user === undefined ? (
      <Redirect to="/" />
    ) : (
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">
            {getUserFullName(user).fullName}
          </h1>
        </div>
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
