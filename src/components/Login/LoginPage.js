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

  const toastId = React.useRef(null);
  const onSubmit = (authDetails) => {
    toastId.current = toast.loading("Authenticating...");
    setIsLoading(true);
    props
      .onInitLogin(authDetails)
      .then((userId) => {
        if (userId === null) {
          toast.dismiss(toastId.current);
          toast.error("Failed !!!", { delay: 300 });
        } else {
          toast.dismiss(toastId.current);
          toast.success("Successfully Logged In", { delay: 300 });
          history.push(`/dashboard`);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        toast.dismiss(toastId.current);
        toast.error(err.message);
      });
  };

  return (
    <div className="box-layout">
      <div className="box-layout__box">
        <h1 className="box-layout__title">Pradata App</h1>
        <h3>Sign In</h3>
        {/* <p>It's time to connect with us.</p> */}
        {isLoading ? (
          <LoginForm onSubmit={onSubmit} isLoading={true} />
        ) : (
          <LoginForm onSubmit={onSubmit} isLoading={false} />
        )}
      </div>
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
