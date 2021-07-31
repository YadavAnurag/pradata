import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const routes = {
    admin: [
      { to: "/", text: "Home" },
      { to: "/help", text: "Help" },

      { to: "/users", text: "Users" },
      { to: "/add", text: "Add New User" },

      { to: "/renew", text: "Renewal" },
      { to: "/profile", text: "Profile" },
      { to: "/help", text: "Help" },
    ],
    user: [],
  };

  return (
    <div>
      <ul>
        {/* <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/help">Help</Link>
        </li> */}
        {routes.admin.map((route, key) => {
          return (
            <Link key={key} to={route.to}>
              {route.text}
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Navigation;
