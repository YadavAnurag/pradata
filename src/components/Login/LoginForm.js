import React, { useState, useEffect } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { useLocation } from "react-router-dom";

import { isValidEmailId, isValidPassword } from "../../utils/validation";
import { toast } from "react-toastify";
import Spinner from "../UI/Spinner/Spinner";

const LoginForm = (props) => {
  // +state
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [secretCode, setSecretCode] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState({
    emailId: "",
    password: "",
    secretCode: "",
    captcha: "",
  });
  // -state

  // handles
  const handleEmailIdChange = (e) => {
    const value = e.target.value;
    setEmailId(value);

    setError((previousError) => ({
      ...previousError,
      emailId: "",
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    setError((previousError) => ({
      ...previousError,
      password: "",
    }));
  };

  const handleSecretCodeChange = (e) => {
    const value = e.target.value;
    setSecretCode(value);

    setError((previousError) => ({
      ...previousError,
      secretCode: "",
    }));
  };

  const handleCaptchaChange = (e) => {
    const value = e.target.value;
    setCaptcha(value);

    setError((previousError) => ({
      ...previousError,
      captcha: "",
    }));
  };

  const handleUserChange = () => {
    setIsAdmin(!isAdmin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("[Login Form: handleSubmit - props.onSubmit]");

    if (!isValidEmailId(emailId)) {
      setError((previousError) => ({
        ...previousError,
        emailId: "Please enter a valid Email Id",
      }));
      loadCaptchaEnginge(6);
    }
    if (!isValidPassword(password)) {
      setError((previousError) => ({
        ...previousError,
        password:
          "Password should contain, 8 characters with at least , special, uppercase, lowercase and number",
      }));
      loadCaptchaEnginge(6);
    }
    if (isAdmin && !isValidPassword(secretCode)) {
      setError((previousError) => ({
        ...previousError,
        secretCode:
          "Secret code should contain, 8 characters with at least , special, uppercase, lowercase and number",
      }));
      loadCaptchaEnginge(6);
    }

    if (validateCaptcha(captcha) === false) {
      setError((previousError) => ({
        ...previousError,
        captcha: "CAPTCHA not matched",
      }));
      loadCaptchaEnginge(6);
    }

    const isNoError =
      isAdmin === false
        ? error.emailId === "" && error.password === "" && error.captcha === ""
        : error.emailId === "" &&
          error.password === "" &&
          error.captcha === "" &&
          error.secretCode === "";

    if (isNoError) {
      // TODO - submit it
      // props.onSubmit({
      //   emailId,
      //   password,
      //   captcha,
      //   secretCode: isAdmin === true ? secretCode : "",
      // });
      console.log("will submit it", {
        emailId,
        password,
        captcha,
        isAdmin,
        secretCode,
      });
      setTimeout(() => {
        const a = Math.floor(Math.random() * 2);
        if (a === 0) {
          toast.success("Logged In");
        } else if (a === 1) {
          toast.error("Incorrect Username or Password");
        }
        loadCaptchaEnginge(6);
        setError((previousError) => ({
          ...previousError,
          captcha: "",
        }));
        setIsLoading(false);
      }, 3000);
    }
  };

  // component did mount, if page reloads
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email Id</label>
        <input
          type="email"
          name="emailId"
          placeholder="Email Id"
          value={emailId}
          onChange={handleEmailIdChange}
          required
        />
        <span>{error.emailId}</span>

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          title={`Password Should Contain\n\n1 Uppercase Character(A-Z) \n1 Lowercase Character(a-z) \n1 Special Character(!@#$%^&*)\n1 Digit(0-9)\n8 Characters length`}
          required
        />
        <span>{error.password}</span>

        <label>isAdmin</label>
        <input
          type="radio"
          id="isAdmin"
          name="isAdmin"
          value={isAdmin}
          onClick={handleUserChange}
          required={isAdmin}
        />

        {/* hide status change if user is not admin */}
        <div hidden={!isAdmin}>
          <label>Secret Code</label>
          <input
            type="password"
            name="secretCode"
            placeholder="Secret Code"
            value={secretCode}
            onChange={handleSecretCodeChange}
            title={`Secret Code Should Contain\n\n1 Uppercase Character(A-Z) \n1 Lowercase Character(a-z) \n1 Special Character(!@#$%^&*)\n1 Digit(0-9)\n8 Characters length`}
            required={isAdmin}
          />
          <span>{error.secretCode}</span>
        </div>

        <label>Captcha</label>
        <LoadCanvasTemplate />

        <label>Captcha</label>
        <input
          type="text"
          name="captcha"
          placeholder="Captcha"
          value={captcha}
          onChange={handleCaptchaChange}
          required
        />
        <span>{error.captcha}</span>
      </div>
      <div>
        <button>Login</button>
        <div hidden={!isLoading}>
          <Spinner />
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
