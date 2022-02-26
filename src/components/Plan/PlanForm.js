import React, { useState } from "react";
// import moment from "moment";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";

const PlanForm = (props) => {
  // +state
  const [title, setTitle] = useState(props.plan ? props.plan.title : "");
  const [price, setPrice] = useState(props.plan ? props.plan.price / 100 : 100);
  const [status, setStatus] = useState(
    props.plan ? props.plan.status : "active"
  );
  const [description, setDescription] = useState(
    props.plan ? props.plan.description : ""
  );
  const [validityPeriod, setValidityPeriod] = useState(
    props.plan ? props.plan.validityPeriod / (24 * 3600 * 1000) : 30
  );
  const [error, setError] = useState({
    title: "",
    price: "",
    status: "",
    description: "",
    validityPeriod: "",
  });
  console.log("useState, error", error);
  // -state

  // configs
  const planStatusConfigs = [
    { text: "Active", value: "active" },
    { text: "Inactive", value: "inactive" },
  ];

  // handles
  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);

    setError((previousError) => ({
      ...previousError,
      title: "",
    }));
  };
  const handleValidityPeriod = (e) => {
    const value = e.target.value;
    if (!value || value.match(/^\d{1,}(\.?\d{0,2})$/)) {
      setValidityPeriod(value);

      setError((previousError) => ({
        ...previousError,
        validityPeriod: "",
      }));
      return;
    } else {
      setError((previousError) => ({
        ...previousError,
        validityPeriod: "Should be only number",
      }));
    }
  };
  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (!value || value.match(/^\d{1,}(\.?\d{0,2})$/)) {
      setPrice(value);

      setError((previousError) => ({
        ...previousError,
        price: "",
      }));
      return;
    } else {
      setError((previousError) => ({
        ...previousError,
        price: "Should be only number",
      }));
    }
  };
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);

    setError((previousError) => ({
      ...previousError,
      description: "",
    }));
  };
  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatus(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("[PlanForm: handleSubmit]");
    console.log("[PlanForm: handleSubmit - props.onSubmit]");
    if (title === "") {
      setError((previousError) => ({
        ...previousError,
        title: "Please enter plan title",
      }));
    }
    if (!!!price) {
      setError((previousError) => ({
        ...previousError,
        price: "Should be more than zero",
      }));
    }
    if (!!!validityPeriod) {
      setError((previousError) => ({
        ...previousError,
        validityPeriod: "Should be more than zero",
      }));
    }
    if (description === "") {
      setError((previousError) => ({
        ...previousError,
        description: "Please enter some description",
      }));
    }
    console.log(
      !!!error.title,
      !!!error.description,
      !!!error.price,
      !!!error.validityPeriod
    );

    if (
      title !== "" &&
      description !== "" &&
      validityPeriod !== "" &&
      price !== ""
    ) {
      props.onSubmit({
        title,
        validityPeriod: Number.parseInt(validityPeriod) * 24 * 3600 * 1000,
        price: Number.parseInt(price) * 100,
        description,
        status,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <div>show error using state</div> */}
      {/* <div> */}
      {/* <label>Title</label> */}
      <input
        type="text"
        placeholder={error.title ? error.title : "Title"}
        value={title}
        onChange={handleTitleChange}
      />
      {/* <span>{error.title}</span> */}

      {/* <label>Validity Period in Days</label> */}
      <input
        type="text"
        placeholder="Validity Period in Days"
        value={validityPeriod}
        onChange={handleValidityPeriod}
      />
      {/* <label>Price</label> */}
      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={handlePriceChange}
      />
      {/* <label>Description</label> */}
      <input
        type="text"
        placeholder={error.description ? error.description : "Description"}
        value={description}
        onChange={handleDescriptionChange}
      />
      {/* <span>{error.description}</span> */}
      {/* <label>Status</label> */}
      <select name="status" value={status} onChange={handleStatusChange}>
        {planStatusConfigs.map((status, key) => {
          return (
            <option key={key} value={status.value}>
              {status.text}
            </option>
          );
        })}
      </select>
      {/* </div> */}
      <div>
        <button className="button">Save Plan</button>
      </div>
    </form>
  );
};

export default PlanForm;
