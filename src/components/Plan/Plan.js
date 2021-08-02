import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const Plan = (props) => {
  const { id, title, price, status, description, validityPeriod, createdAt } =
    props.plan;

  return (
    <div>
      <button onClick={() => props.onRemove(id)}>Delete</button>
      <Link to={`/plans/edit?id=${id}`}>
        <p>id: {id}</p>
        <p>title: {title}</p>
        <p>price: {price / 100}</p>
        <p>status: {status}</p>
        <p>description: {description}</p>
        <div>
          validityPeriod:{" "}
          {moment.duration(validityPeriod, "milliseconds").asDays()} Days
        </div>
        <p>Plan Created: {moment(createdAt).format()}</p>
      </Link>
    </div>
  );
};

export default Plan;
