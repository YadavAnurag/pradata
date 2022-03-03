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
    createdAt,
  } = props.user;

  const jsx = (
    <div className="user-list-item">
      <div className="list-item__user-and-due">
          <div className="list-item__user">
            <h3 className="list-item__title">
              {getUserFullName({ firstName, middleName, lastName }).fullName}
            </h3>
          </div>
          <div className="list-item__due">
            <p>Total Due:</p>
            <p>
              &#8377;&nbsp;
              {getUserPaymentDetailsWithAllUsages(props.user, props.plans)
                .totalDueAmount / 100}
            </p>
          </div>
        </div>

        <div className="list-item__user-details">
          <div>
            <p>Contact Number:</p>
            <p>{contactNumber}</p>
          </div>
          <div>
            <p>Email Id:</p>
            <p style={{ textTransform: "lowercase" }}>{emailId}</p>
          </div>
          <div>
            <p>Address:</p>
            <p>{address}</p>
          </div>
          <div>
            <p>Connected At:</p>
            <p>{moment(createdAt).format("DD-MMM-YYYY")}</p>
          </div>
        </div>
    </div>
  );

  return (
    <div>
      <div className="list-item-top">
        <p className="list-item-top__status-value">
          {props.isAdmin ? status : "My Information"}
        </p>
      </div>
      {props.isAdmin ? (
        <Link to={`/usages?userId=${id}`}>
          {jsx}
        </Link>
      ): (
        <div>
          {jsx}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  plans: state.plans,
  isAdmin: state.auth.isAdmin,
});
export default connect(mapStateToProps)(User);
