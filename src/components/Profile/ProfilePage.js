import React from "react";
import moment from "moment";
import { connect } from "react-redux";

import Profile from "./Profile";

const ProfilePage = (props) => {
  const {
    id = "xyz",
    firstName = "Sai",
    middleName = "Prasad",
    lastName = "Srihasam",
    emailId = "sai@ncr.com",
    contactNumber = "9999000000",
    address = "Hyderabad Telangana",
    status = "active",
    isAdmin = true,
    createdAt = moment("2019-07-01").valueOf(),
  } = props.user;

  return (
    <div>
      <Profile user={props.user} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.users.find(({ id, isAdmin }) => id === "xyz2" && isAdmin),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
