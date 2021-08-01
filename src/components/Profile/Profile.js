import React from "react";
import moment from "moment";

import { getUserFullName } from "../../store/utility/utility";

const Profile = (props) => {
  const {
    id,
    firstName,
    middleName,
    lastName,
    emailId,
    contactNumber,
    address,
    status,
    createdAt,
  } = props.admin;

  return (
    <div>
      <p>
        Name: {getUserFullName({ firstName, middleName, lastName }).fullName}
      </p>
      <p>emailId: {emailId}</p>
      <p>contactNumber: {contactNumber}</p>
      <p>address: {address}</p>
      <p>Account Status: {status}</p>
      <p>Account Created: {moment(createdAt).format()}</p>
      <br />
    </div>
  );
};
export default Profile;
