import React from "react";
import { toast } from "react-toastify";

const Footer = (props) => {
  const onClickHandler = () => {
    toast.success("Hey..... Thanks!!");
  };

  return (
    <div className="footer-container" onClick={onClickHandler}>
      <div className="footer">
        <p>Developed By &nbsp;:</p>
        <a href="https://github.com/yadavanurag" target="_blank" rel="noreferrer">
          Anurag Yadav
        </a>
      </div>
    </div>
  );
};

export default Footer;
