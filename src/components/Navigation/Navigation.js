import React from "react";
import { Link } from "react-router-dom";

const Navigation = (props) => {
  const routes = {
    admin: [
      { to: "/", text: "Home" },
      { to: "/dashboard", text: "Dashboard" },
      { to: "/users", text: "Users" },
      { to: "/plans", text: "Our Plan" },
      { to: "/profile", text: "Profile" },
      { to: "/help", text: "Help" },
    ],
    user: [],
  };

  return (
    <div>
      <ul>
        {routes.admin.map((route, key) => {
          return (
            <Link key={key} to={route.to}>
              {route.text}
            </Link>
          );
        })}
        <button onClick={props.initLogout}>Logout</button>
      </ul>
    </div>
  );
};

export default Navigation;
