import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const routes = {
    admin: [
      { to: "/", text: "Home" },
      { to: "/users", text: "Users" },
      { to: "/plans", text: "Our Plan" },
      { to: "/profile", text: "Profile" },
      { to: "/about", text: "About" },
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
      </ul>
    </div>
  );
};

export default Navigation;
