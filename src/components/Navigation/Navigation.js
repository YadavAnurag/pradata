import React, { useState, useEffect } from "react";
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

  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  const changeWidth = () => {
    setScreenWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <nav className="nav">
      {(toggleMenu || screenWidth > 500) && (
        <ul className="nav__list">
          {/* <span className="nav__title">Pradata</span> */}
          {props.routes.map((route, key) => {
            console.log("route", route, props.loggedIn);
            if (props.loggedIn && route.text === "Logout") {
              return (
                <Link
                  key={key}
                  to={route.to}
                  onClick={() => {
                    setToggleMenu(!toggleMenu);
                    props.initLogout();
                  }}
                  className="nav__link"
                >
                  {route.text}
                </Link>
              );
            } else {
              return (
                <Link
                  key={key}
                  to={route.to}
                  className="nav__link"
                  onClick={() => setToggleMenu(!toggleMenu)}
                >
                  {route.text}
                </Link>
              );
            }
          })}
        </ul>
      )}
      <button onClick={handleToggleMenu} className="trigger">
        BTN
      </button>
    </nav>
  );
};

export default Navigation;
