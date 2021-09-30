import React from "react";

import User from "./User";

const UserList = (props) => {
  return (
    <div>
      {props.users.map((user, key) => {
        // show only non-admin users
        if (!user.isAdmin) return <User key={key} user={user} />;
      })}
    </div>
  );
};

export default UserList;
