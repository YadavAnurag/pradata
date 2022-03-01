import React from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";

import UserForm from "../User/UserForm";

const Profile = (props) => {
  const history = useHistory();

  const toastId = React.useRef(null);
  const onSubmit = (updates) => {
    toastId.current = toast.loading("Updating Profile...");
    props
      .editUser(props.user.id, updates)
      .then((payload) => {
        if (payload.error !== null) {
          toast.dismiss(toastId.current);
          toast.error(payload.msg, { delay: 300 });
        } else {
          toast.dismiss(toastId.current);
          toast.success("Profile Updated", { delay: 300 });
          history.goBack();
        }
      })
      .catch((err) => {
        toast.dismiss(toastId.current);
        toast.error(err.message);
      });
  };

  return (
    <div className="content-container">
      <UserForm user={props.user} onSubmit={onSubmit} />
    </div>
  );
};
export default Profile;
