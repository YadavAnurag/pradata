import React from "react";

import User from "./User";

const UserList = (props) => {
  return (
    <div>
      {props.users.map((user, key) => {
        return <User key={key} user={user} />;
      })}
    </div>
  );
};

export default UserList;
