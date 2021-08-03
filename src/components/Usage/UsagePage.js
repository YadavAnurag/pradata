import React from "react";
import { useParams, useLocation, useHistory } from "react-router";
import queryString from "query-string";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import UsageList from "./UsageList";
import { getSelectedUsers } from "../../store/selectors/index";
import { getUserFullName } from "../../store/utility/utility";

const UsagePage = (props) => {
  const location = useLocation();
  const { id: userId } = queryString.parse(location.search);
  const user = props.users.find(({ id }) => id === userId);
  const usages = user.usages;

  const {
    firstName,
    middleName,
    lastName,
    emailId,
    contactNumber,
    address,
    status,
    createdAt,
  } = user;

  return (
    <div>
      <div>
        <Link to={`/users/edit?id=${userId}`}> Edit </Link>
        <Link to={`/users/renew?id=${userId}`}> Renew Plan </Link>
        <p>
          Name: {getUserFullName({ firstName, middleName, lastName }).fullName}
        </p>
        <p>emailId: {emailId}</p>
        <p>contactNumber: {contactNumber}</p>
        <p>address: {address}</p>
        <p>Account Status: {status}</p>
        <div>Usage: {usages.length}</div>
        <p>Account Created: {moment(createdAt).format()}</p>
      </div>
      <br />

      <UsageList usages={usages} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};
export default connect(mapStateToProps)(UsagePage);
