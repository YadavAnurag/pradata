import React from "react";

import User from "./User";

const UserList = (props) => {
  return (
    <div className="content-container">
      <div className="list-header">
        <div className="show-for-desktop">Users</div>
      </div>
      <div className="list-body">
        {props.users.length === 0 ? (
          <div className="list-item list-item--message">
            <span>
              <p>No Users</p>
            </span>
          </div>
        ) : (
          props.users.map((user, key) => {
            // show only non-admin users
            if (!user.auth.isAdmin){
              return <User key={key} user={user} />;
            }else{
              return null;
            }
          })
        )}
      </div>
    </div>
  );
};

export default UserList;
