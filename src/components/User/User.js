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
      <Link to={`/usages?userId=${id}`} className="list-item">
        <div>
          <h3 className="list-item__title">
            {getUserFullName({ firstName, middleName, lastName }).fullName}
          </h3>
        </div>
        <div className="list-item__user-due">
          <p>Due:</p>
          <p>
            &#8377;
            {getUserPaymentDetailsWithAllUsages(props.user, props.plans)
              .totalDueAmount / 100}
          </p>
        </div>
        <div className="list-item__user-details">
          <div>
            <p>Email Id:</p>
            <p>{emailId}</p>
          </div>
          <div>
            <p>Contact Number:</p>
            <p>{contactNumber}</p>
          </div>
          <div>
            <p>Address:</p>
            <p>{address}</p>
          </div>
          <div>
            <p>Status:</p>
            <p>{status}</p>
          </div>
          <div>
            <p>Usage:</p>
            <p>{usages.length}</p>
          </div>
          <div>
            <p>Created:</p>
            <p>{moment(createdAt).format()}</p>
          </div>
        </div>
      </Link>

      {/* <Link to={`/usages?userId=${id}`}>
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
      </Link> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  plans: state.plans,
});
export default connect(mapStateToProps)(User);
