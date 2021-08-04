import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getUserFullName } from "../../store/utility/utility";
import { getUserPaymentDetailsWithAllUsages } from "../../utils/validation";

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

  const some = getUserPaymentDetailsWithAllUsages(props.user, props.plans);
  console.log("some\n", some);

  return (
    <div>
      <Link to={`/usages?id=${id}`}>
        <p>
          Total Due: &#8377;
          {getUserPaymentDetailsWithAllUsages(props.user, props.plans)
            .totalDueAmount / 100}
        </p>
        <p>
          Name: {getUserFullName({ firstName, middleName, lastName }).fullName}
        </p>
        <p>emailId: {emailId}</p>
        <p>contactNumber: {contactNumber}</p>
        <p>address: {address}</p>
        <p>Account Status: {status}</p>
        <div>Usage: {usages.length}</div>
        <p>Account Created: {moment(createdAt).format()}</p>
        <br />
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  plans: state.plans,
});
export default connect(mapStateToProps)(User);
