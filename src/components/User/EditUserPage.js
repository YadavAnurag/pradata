import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";
import { toast } from "react-toastify";

import { editUser } from "../../store/actions/index";
import UserForm from "./UserForm";

export const EditUserPage = (props) => {
  const history = useHistory();
  const { id: userId } = queryString.parse(history.location.search);
  const user = props.users.find(({ id }) => id === userId);

  const onSubmit = (updates) => {
    props.editUser(userId, updates);
    history.push("/users");
    toast.info("User Updated");
  };

  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <div className="page-header__title">
            <h1>Edit User</h1>
          </div>
        </div>
      </div>
      <div className="content-container">
        <UserForm onSubmit={onSubmit} user={user} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});
const mapDispatchToProps = (dispatch) => ({
  editUser: (id, updates) => dispatch(editUser({ id, updates })),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditUserPage);
