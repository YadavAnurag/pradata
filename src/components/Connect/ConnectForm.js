import React, { useState } from "react";

const ConnectForm = (props) => {
  //   const {
  //     title,
  //     subTitle,
  //     description,
  //     name,
  //     contactNumber,
  //     emailId,
  //     address,
  //     locationURL,
  //   } = props.connectData;

  // +state
  const [title, setTitle] = useState(
    props.connectData.title ? props.connectData.title : ""
  );
  const [subTitle, setSubTitle] = useState(
    props.connectData.subTitle ? props.connectData.subTitle : ""
  );
  const [description, setDescription] = useState(
    props.connectData.description ? props.connectData.description : ""
  );
  const [name, setName] = useState(
    props.connectData.name ? props.connectData.name : ""
  );
  const [contactNumber, setContactNumber] = useState(
    props.connectData.contactNumber ? props.connectData.contactNumber : ""
  );
  const [emailId, setEmailId] = useState(
    props.connectData.emailId ? props.connectData.emailId : ""
  );
  const [address, setAddress] = useState(
    props.connectData.address ? props.connectData.address : ""
  );
  const [locationURL, setLocationURL] = useState(
    props.connectData.locationURL ? props.connectData.locationURL : ""
  );

  const [error, setError] = useState({
    title: "",
    subTitle: "",
    description: "",
    name: "",
    contactNumber: "",
    emailId: "",
    address: "",
    locationURL: "",
  });
  console.log("useState, error", error);
  // -state

  // handles
  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);

    setError((previousError) => ({
      ...previousError,
      title: "",
    }));
  };
  const handleSubTitleChange = (e) => {
    const value = e.target.value;
    setSubTitle(value);

    setError((previousError) => ({
      ...previousError,
      subTitle: "",
    }));
  };
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);

    setError((previousError) => ({
      ...previousError,
      description: "",
    }));
  };
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);

    setError((previousError) => ({
      ...previousError,
      name: "",
    }));
  };
  const handleContactNumberChange = (e) => {
    const value = e.target.value;
    setContactNumber(value);

    setError((previousError) => ({
      ...previousError,
      contactNumber: "",
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
  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);

    setError((previousError) => ({
      ...previousError,
      address: "",
    }));
  };
  const handleLocationURLChange = (e) => {
    const value = e.target.value;
    setLocationURL(value);

    setError((previousError) => ({
      ...previousError,
      locationURL: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("[PlanForm: handleSubmit]");
    console.log("[PlanForm: handleSubmit - props.onSubmit]");
    if (title === "") {
      setError((previousError) => ({
        ...previousError,
        title: "Please Enter Title",
      }));
    }
    if (subTitle === "") {
      setError((previousError) => ({
        ...previousError,
        subTitle: "Please Enter Subtitle",
      }));
    }
    if (description === "") {
      setError((previousError) => ({
        ...previousError,
        description: "Please Enter Description",
      }));
    }
    if (name === "") {
      setError((previousError) => ({
        ...previousError,
        name: "Please Enter Full Name",
      }));
    }
    if (contactNumber === "") {
      setError((previousError) => ({
        ...previousError,
        contactNumber: "Please Enter Contact Number",
      }));
    }
    if (emailId === "") {
      setError((previousError) => ({
        ...previousError,
        emailId: "Please Enter Email Id",
      }));
    }
    if (address === "") {
      setError((previousError) => ({
        ...previousError,
        address: "Please Enter Address",
      }));
    }
    if (locationURL === "") {
      setError((previousError) => ({
        ...previousError,
        locationURL: "Please Enter Location URL",
      }));
    }
    // console.log(
    //   !!!error.title,
    //   !!!error.description,
    //   !!!error.price,
    //   !!!error.validityPeriod
    // );

    if (
      title !== "" &&
      subTitle !== "" &&
      description !== "" &&
      name !== "" &&
      contactNumber !== "" &&
      emailId !== "" &&
      address !== "" &&
      locationURL !== ""
    ) {
      props.onSubmit({
        title,
        subTitle,
        description,
        name,
        contactNumber,
        emailId,
        address,
        locationURL,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={error.title ? error.title : "Title"}
        className={!!error.title ? "input input-error" : "input"}
        value={title}
        onChange={handleTitleChange}
      />
      <input
        type="text"
        placeholder={error.subTitle ? error.subTitle : "Sub Title"}
        className={!!error.subTitle ? "input input-error" : "input"}
        value={subTitle}
        onChange={handleSubTitleChange}
      />
      <textarea
        name="description"
        rows="2"
        cols="30"
        placeholder={error.description ? error.description : "Description"}
        className={!!error.description ? "input input-error" : "input"}
        value={description}
        onChange={handleDescriptionChange}
      ></textarea>
      <input
        type="text"
        placeholder={error.name ? error.name : "Full Name"}
        className={!!error.name ? "input input-error" : "input"}
        value={name}
        onChange={handleNameChange}
      />
      <input
        type="text"
        placeholder={
          error.contactNumber ? error.contactNumber : "Contact Number"
        }
        className={!!error.contactNumber ? "input input-error" : "input"}
        value={contactNumber}
        onChange={handleContactNumberChange}
      />
      <input
        type="text"
        placeholder={error.emailId ? error.emailId : "Email Id"}
        className={!!error.emailId ? "input input-error" : "input"}
        value={emailId}
        onChange={handleEmailIdChange}
      />
      <textarea
        name="address"
        rows="2"
        cols="30"
        placeholder={error.address ? error.address : "Address"}
        className={!!error.address ? "input input-error" : "input"}
        value={address}
        onChange={handleAddressChange}
      ></textarea>
      <input
        type="text"
        placeholder={error.locationURL ? error.locationURL : "Location URL"}
        className={!!error.locationURL ? "input input-error" : "input"}
        value={locationURL}
        onChange={handleLocationURLChange}
      />

      <div>
        <button className="button">Save</button>
      </div>
    </form>
  );
};

export default ConnectForm;
