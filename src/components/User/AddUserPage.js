import React from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";

import { initAddUser } from "../../store/actions/index";
import UserForm from "./UserForm";
import { toast } from "react-toastify";

export const AddUserPage = (props) => {
  const history = useHistory();

  const toastId = React.useRef(null);
  const onSubmit = (user) => {
    toastId.current = toast.loading("Adding User...");
    props
      .onInitAddUser(user)
      .then((payload) => {
        if (payload.error !== null) {
          toast.dismiss(toastId.current);
          toast.error(payload.msg, { delay: 300 });
        } else {
          toast.dismiss(toastId.current);
          toast.success("User Added", { delay: 300 });
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
