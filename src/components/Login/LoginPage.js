import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";
import { toast } from "react-toastify";

import { initLogin, initSetUsers } from "../../store/actions";
import LoginForm from "./LoginForm";

const LoginPage = (props) => {
  const history = useHistory();
  const { userId } = queryString.parse(history.location.search);

  const loginHandler = () => {
    console.log("porps", props.history.location.pathname);
    props
      .onInitLogin(userId)
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
      <LoginForm />
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     users: state.users,
//   };
// };
const mapDispatchToProps = (dispatch) => {
  return {
    onInitLogin: (id) => dispatch(initLogin({ id })),
    onInitSetUsers: () => dispatch(initSetUsers()),
  };
};
export default connect(undefined, mapDispatchToProps)(LoginPage);
