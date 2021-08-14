import React from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";

import { initAddUser } from "../../store/actions/index";
import UserForm from "./UserForm";

export const AddUserPage = (props) => {
  const history = useHistory();

  const onSubmit = (user) => {
    props.onInitAddUser(user);
    history.push("/users");
  };

  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <div className="page-header__title">
            <h1>Add User</h1>
          </div>
        </div>
      </div>
      <div className="content-container">
        <UserForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onInitAddUser: (user) => dispatch(initAddUser(user)),
});
export default connect(undefined, mapDispatchToProps)(AddUserPage);
