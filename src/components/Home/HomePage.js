import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { initLogin, initSetUsers } from "../../store/actions";

const HomePage = (props) => {
  return (
    <div>
      <p>Home, Let's Start Coding... and make self-reliant Digital India</p>
      <Link to={`/login`}>Login</Link>
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
export default connect(undefined, mapDispatchToProps)(HomePage);
