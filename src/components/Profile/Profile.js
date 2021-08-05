import React from "react";
import moment from "moment";
import { toast } from "react-toastify";

import UserForm from "../User/UserForm";

const Profile = (props) => {
  const onSubmit = (updates) => {
    props.editUser(props.user.id, updates);
    // history.push("/users");
    toast.info("User Updated");
  };

  return (
    <div>
      <UserForm user={props.user} onSubmit={onSubmit} />
    </div>
  );
};
export default Profile;
