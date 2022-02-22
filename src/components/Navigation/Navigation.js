import React from "react";
import { Link } from "react-router-dom";

const Navigation = (props) => {
  // const routes = {
  //   admin: [
  //     { to: "/", text: "Home" },
  //     { to: "/dashboard", text: "Dashboard" },
  //     { to: "/users", text: "Users" },
  //     { to: "/plans", text: "Plans" },
  //     { to: "/profile", text: "Profile" },
  //     { to: "/help", text: "Help" },
  //   ],
  //   user: [
  //     { to: "/", text: "Home" },
  //     { to: "/dashboard", text: "Dashboard" },
  //     { to: "/plans", text: "Plans" },
  //     { to: "/profile", text: "Profile" },
  //     { to: "/help", text: "Help" },
  //   ],
  //   public: [
  //     { to: "/", text: "Home" },
  //     { to: "/plans", text: "Plans" },
  //     { to: "/help", text: "Help" },
  //   ],
  // };

  return (
    <nav className="nav">
      <ul className="nav__list">
        {/* <span className="nav__title">Pradata</span> */}
        {props.routes.map((route, key) => {
          return (
            <Link key={key} to={route.to} className="nav__link">
              {route.text}
            </Link>
          );
        })}
        {props.loggedIn ? (
          <Link onClick={props.initLogout}>Logout</Link>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </ul>
      <button className="trigger">BTN</button>
    </nav>
  );
};

export default Navigation;
