import React from "react";
import { connect } from "react-redux";

import { initLogin, initSetUsers } from "../../store/actions";

const HomePage = (props) => {
  const loginHandler = () => {
    console.log("porps", props.history.location.pathname);
    props
      .onInitLogin()
      .then((userId) => {
        console.log(
          userId,
          "logged in, Will redirect to dashboard page",
          props.history.push
        );
        props
          .onInitSetUsers()
          .then(() => {
            props.history.push("/dashboard");
          })
          .catch((err) => {
            console.log("[HomePage.js] - Got error while fetching users", err);
          });
      })
      .catch((err) => {
        console.log("[HomePage.js] - Got error while login", err);
      });
  };

  return (
    <div>
      <p>Home, Let's Start Coding... and make self-reliant Digital India</p>
      <button onClick={loginHandler}>loginad</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitLogin: () => dispatch(initLogin()),
    onInitSetUsers: () => dispatch(initSetUsers()),
  };
};
export default connect(undefined, mapDispatchToProps)(HomePage);
