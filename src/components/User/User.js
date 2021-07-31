import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import { getUserFullName } from "../../store/utility/utility";

const User = (props) => {
  const {
    id,
    firstName,
    middleName,
    lastName,
    emailId,
    contactNumber,
    address,
    status,
    usages,
    createdAt,
  } = props.user;

  return (
    <div>
      <p>
        Name: {getUserFullName({ firstName, middleName, lastName }).fullName}
      </p>
      <p>emailId: {emailId}</p>
      <p>contactNumber: {contactNumber}</p>
      <p>address: {address}</p>
      <p>Account Status: {status}</p>
      <div>Usage: {usages.length}</div>
      <p>Account Created: {moment(createdAt).format()}</p>
      <Link to={`/usage?id=${id}`}>See Usages</Link>
      <br />
    </div>
  );
};

export default User;
