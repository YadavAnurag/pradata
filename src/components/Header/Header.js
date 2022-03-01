import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import { initLogout } from "../../store/actions/index";

export const Header = (props) => {
  const routesObject = {
    admin: [
      { to: "/", text: "Home" },
      { to: "/dashboard", text: "Dashboard" },
      { to: "/users", text: "Users" },
      { to: "/plans", text: "Plans" },
      { to: "/profile", text: "Profile" },
      { to: "/connect", text: "Connect" },
      { to: "/logout", text: "Logout" },
    ],
    user: [
      { to: "/", text: "Home" },
      { to: "/dashboard", text: "Dashboard" },
      { to: "/plans", text: "Plans" },
      { to: "/payments", text: "Payments" },
      { to: "/profile", text: "Profile" },
      { to: "/connect", text: "Connect" },
      { to: "/logout", text: "Logout" },
    ],
    public: [
      { to: "/", text: "Home" },
      { to: "/plans", text: "Plans" },
      { to: "/connect", text: "Connect" },
      { to: "/login", text: "Login" },
    ],
  };

  console.log("userID", props.userId);
  let routes = null;
  if (!!!props.userId) {
    console.log("1");
    routes = routesObject.public;
    // UNDO;
    // routes = routesObject.admin;
  } else {
    console.log("2");
    if (props.isAdmin) {
      console.log("3");
      routes = routesObject.admin;
    } else {
      console.log("4");
      routes = routesObject.user;
    }
  }
  console.log(routes);
  return (
    <header className="header-content">
      <Navigation
        initLogout={props.initLogout}
        routes={routes}
        loggedIn={!!props.userId}
      />
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    isAdmin: state.auth.isAdmin,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    initLogout: () => dispatch(initLogout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
