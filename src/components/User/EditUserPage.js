import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";
import { toast } from "react-toastify";

import { initEditUser, initRemoveUser } from "../../store/actions/index";
import UserForm from "./UserForm";

export const EditUserPage = (props) => {
  const history = useHistory();
  const { id: userId } = queryString.parse(history.location.search);
  const user = props.users.find(({ id }) => id === userId);

  const toastId = React.useRef(null);

  const onSubmit = (updates) => {
    toastId.current = toast.loading("Updating User...");
    console.log("EditUserPage.js - got updates", updates);
    props
      .onInitEditUser(userId, updates)
      .then((payload) => {
        if (payload.error !== null) {
          toast.dismiss(toastId.current);
          toast.error(payload.msg, { delay: 300 });
        } else {
          toast.dismiss(toastId.current);
          toast.success("User Updated", { delay: 300 });
          history.push("/users");
        }
      })
      .catch((err) => {
        toast.dismiss(toastId.current);
        toast.error(err.message);
      });
  };
  const onRemoveHandler = () => {
    toastId.current = toast.loading("Updating User...");

    props
      .onInitRemoveUser(userId)
      .then((payload) => {
        if (payload.error !== null) {
          toast.dismiss(toastId.current);
          toast.error(payload.msg, { delay: 300 });
        } else {
          toast.dismiss(toastId.current);
          toast.success("User Removed", { delay: 300 });
          history.push("/users");
        }
      })
      .catch((err) => {
        toast.dismiss(toastId.current);
        toast.error(err.message);
      });
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
        <button
          onClick={onRemoveHandler}
          className="button"
          style={{ marginBottom: "1rem" }}
        >
          Remove
        </button>
        <UserForm onSubmit={onSubmit} user={user} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});
const mapDispatchToProps = (dispatch) => ({
  onInitEditUser: (id, updates) => dispatch(initEditUser({ id, updates })),
  onInitRemoveUser: (id) => dispatch(initRemoveUser({ id })),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditUserPage);
