import React, { useState } from "react";
// import queryString from "query-string";
import { useLocation } from "react-router-dom";

import { validateEmailId, validateDigits } from "../../utils/validation";

const UserForm = (props) => {
  /* 
    check location, if pathname is "/profile"
    then match if users is admin or not
  */
  const location = useLocation();
  const pathname = location.pathname;
  // console.log(pathname, "pathname === /profile", pathname === "/profile");

  // TODO check if admin or not for all cases
  let isAdmin = true;
  if (pathname === "/profile") {
    isAdmin = props.user
      ? props.user.isAdmin && props.user.id.startsWith("xyz")
      : false;
    // console.log(
    //   "isAdmin",
    //   props.user
    //     ? props.user.isAdmin && props.user.id.startsWith("xyz")
    //     : false,
    //   props.user
    // );
  }

  // check location
  // const location = useLocation();
  // const pathname = location.pathname;
  // console.log(pathname, pathname === "/profile");

  // +state
  const [firstName, setFirstName] = useState(
    props.user ? props.user.firstName : ""
  );
  // console.log("firstName", firstName);
  const [middleName, setMiddleName] = useState(
    props.user ? props.user.middleName : ""
  );
  const [lastName, setLastName] = useState(
    props.user ? props.user.lastName : ""
  );
  const [emailId, setEmailId] = useState(props.user ? props.user.emailId : "");
  const [contactNumber, setContactNumber] = useState(
    props.user ? props.user.contactNumber : ""
  );
  const [address, setAddress] = useState(props.user ? props.user.address : "");
  const [status, setStatus] = useState(
    props.user ? props.user.status : "active"
  );
  const [error, setError] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    emailId: "",
    contactNumber: "",
    address: "",
  });
  // -state

  // configs
  const statusConfigs = [
    { text: "Active", value: "active" },
    { text: "Inactive", value: "inactive" },
  ];

  // handles
  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);

    // update error
    setError((previousError) => ({
      ...previousError,
      firstName: "",
    }));
  };
  const handleMiddleNameChange = (e) => {
    const value = e.target.value;
    setMiddleName(value);

    // update error
    setError((previousError) => ({
      ...previousError,
      middleName: "",
    }));
  };
  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);

    // update error
    setError((previousError) => ({
      ...previousError,
      lastName: "",
    }));
  };
  const handleEmailIdChange = (e) => {
    const value = e.target.value;
    setEmailId(value);

    setError((previousError) => ({
      ...previousError,
      emailId: "",
    }));
  };

  const handleContactNumberChange = (e) => {
    const value = e.target.value;
    setContactNumber(value);

    // update error
    setError((previousError) => ({
      ...previousError,
      contactNumber: "",
    }));
  };
  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);

    // update error
    setError((previousError) => ({
      ...previousError,
      address: "",
    }));
  };
  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatus(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("[PlanForm: handleSubmit - props.onSubmit]");
    if (firstName === "") {
      setError((previousError) => ({
        ...previousError,
        firstName: "Please enter first Name",
      }));
    }
    console.log("emailid", emailId);
    if (emailId === "" || !validateEmailId(emailId)) {
      setError((previousError) => ({
        ...previousError,
        emailId: "Please enter a valid Email Id",
      }));
    }
    if (!validateDigits(contactNumber)) {
      setError((previousError) => ({
        ...previousError,
        contactNumber: "Please enter a valid contact number",
      }));
    }
    if (address === "") {
      setError((previousError) => ({
        ...previousError,
        address: "Please enter user address",
      }));
    }
    // console.log(
    //   !!!error.first,
    //   !!!error.description,
    //   !!!error.price,
    //   !!!error.validityPeriod
    // );

    if (
      firstName !== "" &&
      emailId !== "" &&
      contactNumber !== "" &&
      address !== ""
    ) {
      props.onSubmit({
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        emailId,
        contactNumber,
        address,
        status,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={handleFirstNameChange}
        />
        <span>{error.firstName}</span>

        <label>Middle Name</label>
        <input
          type="text"
          name="middleName"
          placeholder="Middle Name"
          value={middleName}
          onChange={handleMiddleNameChange}
        />
        <span>{error.middleName}</span>

        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={handleLastNameChange}
        />
        <span>{error.lastName}</span>

        <label>Email Id</label>
        <input
          type="text"
          name="emailId"
          placeholder="Email Id"
          value={emailId}
          onChange={handleEmailIdChange}
          readOnly={!isAdmin}
        />
        <span>{error.emailId}</span>

        <label>Contact Number</label>
        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={contactNumber}
          onChange={handleContactNumberChange}
          readOnly={!isAdmin}
        />
        <span>{error.contactNumber}</span>

        <label>Address</label>
        <textarea
          name="address"
          placeholder="Address"
          value={address}
          onChange={handleAddressChange}
          rows="2"
          cols="30"
        ></textarea>
        <span>{error.address}</span>

        {/* hide status change if user is not admin */}
        <div hidden={!isAdmin}>
          <label>Status</label>
          <select name="status" value={status} onChange={handleStatusChange}>
            {statusConfigs.map((status, key) => {
              return (
                <option key={key} value={status.value}>
                  {status.text}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div>
        <button>Save</button>
      </div>
    </form>
  );
};

export default UserForm;
