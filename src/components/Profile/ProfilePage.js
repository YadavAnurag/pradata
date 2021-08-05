import React from "react";
import { connect } from "react-redux";

import { editUser } from "../../store/actions/index";
import Profile from "./Profile";

const ProfilePage = (props) => {
  return (
    <div>
      <Profile user={props.user} editUser={props.editUser} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.users.find(({ id, isAdmin }) => id === "xyz2" && isAdmin),
  };
};
const mapDispatchToProps = (dispatch) => {
  return { editUser: (id, updates) => dispatch(editUser({ id, updates })) };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
