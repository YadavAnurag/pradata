import React, { useState, useEffect } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  //LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";

import { isValidEmailId, isValidPassword } from "../../utils/validation";
import Spinner from "../UI/Spinner/Spinner";

const LoginForm = (props) => {
  // +state
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  //const [isLoading, setIsLoading] = useState(props.isLoading);

  const [error, setError] = useState({
    emailId: "",
    password: "",
    captcha: "",
  });
  // -state

  // handles
  const handleEmailIdChange = (e) => {
    const value = e.target.value;
    setEmailId(value);

    if (!!error.emailId) {
      setError((previousError) => ({
        ...previousError,
        emailId: "",
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!!error.password) {
      setError((previousError) => ({
        ...previousError,
        password: "",
      }));
    }
  };

  const handleCaptchaChange = (e) => {
    const value = e.target.value;
    setCaptcha(value);

    if (!!error.captcha) {
      setError((previousError) => ({
        ...previousError,
        captcha: "",
      }));
    }
  };

  const areInputsValid = async (emailId, password, captcha) => {
    let isValidEmailIdWhileSubmit = true;
    if (!isValidEmailId(emailId)) {
      isValidEmailIdWhileSubmit = false;

      setError((previousError) => ({
        ...previousError,
        emailId: "Please enter valid Email Id",
      }));
      loadCaptchaEnginge(6);
    }

    let isValidPasswordWhileSubmit = true;
    if (!isValidPassword(password)) {
      isValidPasswordWhileSubmit = false;

      setPassword("");
      setError((previousError) => ({
        ...previousError,
        password: "Password Policy Not Matched",
      }));
      loadCaptchaEnginge(6);
    }

    let isValidCaptchaWhileSubmit = true;
    if (validateCaptcha(captcha) === false) {
      isValidCaptchaWhileSubmit = false;

      setError((previousError) => ({
        ...previousError,
        captcha: "CAPTCHA not matched",
      }));
      loadCaptchaEnginge(6);
    }

    return (
      isValidEmailIdWhileSubmit &&
      isValidCaptchaWhileSubmit &&
      isValidPasswordWhileSubmit
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    areInputsValid(emailId, password, captcha)
      .then((isValid) => {
        console.log("isValid", isValid);
        if (isValid) {
          props.onSubmit({
            emailId,
            password,
          });
        }
      })
      .then(() => {
        setCaptcha("");
        loadCaptchaEnginge(6);
      });
  };

  // component did mount, if page reloads
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="login__form">
      <div className="form__component">
        {/* <label>Email Id</label> */}
        <input
          type="email"
          name="emailId"
          placeholder={error.emailId ? error.emailId : "Email Id"}
          value={emailId}
          onChange={handleEmailIdChange}
          className={!!error.emailId ? "input input-error" : "input"}
          // required
        />
        {/* <span>{error.emailId}</span> */}
      </div>
      <div className="form__component">
        {/* <label>Password</label> */}
        <input
          type="password"
          name="password"
          placeholder={error.password ? error.password : "Password"}
          value={password}
          onChange={handlePasswordChange}
          className={!!error.password ? "input input-error" : "input"}
          title={`Password Should Contain\n\n1 Uppercase Character(A-Z) \n1 Lowercase Character(a-z) \n1 Special Character(!@#$%^&*)\n1 Digit(0-9)\nTotal 8 Characters length`}
          // required
        />
        {/* <span>{error.password}</span> */}
      </div>
      <div className="form__component__captcha">
        {/* <label>Captcha</label> */}
        <div className="captcha">
          <LoadCanvasTemplate />
        </div>
      </div>
      <div className="form__component">
        {/* <label>Captcha</label> */}
        <input
          type="text"
          name="captcha"
          placeholder="Enter above captcha"
          placeholder={error.captcha ? error.captcha : "Enter above captcha"}
          value={captcha}
          onChange={handleCaptchaChange}
          className={!!error.captcha ? "input input-error" : "input"}
          // required
        />
        {/* <span>{error.captcha}</span> */}
      </div>

      <div className="form__component__submit">
        {props.isLoading ? (
          <Spinner />
        ) : (
          <button className="button">Login</button>
        )}
        {/* <div>
          <button disabled={props.isLoading}>Login</button>
        </div>
        <div hidden={props.isLoading}>
          <Spinner />
        </div> */}
      </div>
    </form>
  );
};

export default LoginForm;
