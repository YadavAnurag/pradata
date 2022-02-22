import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import { initLogin, initSetUsers } from "../../store/actions";
import LoginForm from "./LoginForm";

const LoginPage = (props) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (authDetails) => {
    console.log("submitted");
    setIsLoading(true);
    props
      .onInitLogin(authDetails)
      .then((userId) => {
        toast.success("Successfully Logged In");
        history.push(`/dashboard`);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err);
      });
  };

  return (
    <div className="login">
      <div className="login-header-content">
        <h2>Pradata</h2>
        <h3>Sign In</h3>
        <p></p>
      </div>
      {isLoading ? (
        <LoginForm onSubmit={onSubmit} isLoading={true} />
      ) : (
        <LoginForm onSubmit={onSubmit} isLoading={false} />
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitLogin: (authDetails) => dispatch(initLogin(authDetails)),
    onInitSetUsers: () => dispatch(initSetUsers()),
  };
};
export default connect(undefined, mapDispatchToProps)(LoginPage);
