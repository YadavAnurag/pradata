import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

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
      { to: "/", text: "Logout" },
    ],
    user: [
      { to: "/", text: "Home" },
      { to: "/dashboard", text: "Dashboard" },
      { to: "/plans", text: "Plans" },
      { to: "/payments", text: "Payments" },
      { to: "/profile", text: "Profile" },
      { to: "/connect", text: "Connect" },
      { to: "/", text: "Logout" },
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

  const history = useHistory();

  const toastId = React.useRef(null);
  const handleLogout = () => {
    toastId.current = toast.loading("Logging Out...");
    props
      .onInitLogout()
      .then((loggedOut) => {
        if (!loggedOut) {
          toast.dismiss(toastId.current);
          toast.error("Failed !!!", { delay: 300 });
        } else {
          toast.dismiss(toastId.current);
          toast.success("Logged Out", { delay: 300 });
          history.push(`/`);
        }
      })
      .catch((err) => {
        toast.dismiss(toastId.current);
        toast.error(err.message);
      });
  };

  console.log(routes);
  return (
    <header className="header-content">
      <Navigation
        initLogout={handleLogout}
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
    onInitLogout: () => dispatch(initLogout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
