import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const Plan = (props) => {
  const { id, title, price, status, description, validityPeriod, createdAt } =
    props.plan;

  return (
    <div>
      <p>id: {id}</p>
      <p>title: {title}</p>
      <p>price: {price}</p>
      <p>status: {status}</p>
      <p>description: {description}</p>
      <div>
        validityPeriod:{" "}
        {moment.duration(validityPeriod, "milliseconds").asDays()} Days
      </div>
      <p>Plan Created: {moment(createdAt).format()}</p>
    </div>
  );
};

export default Plan;
