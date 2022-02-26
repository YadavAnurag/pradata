import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const Plan = (props) => {
  const { id, title, price, status, description, validityPeriod, createdAt } =
    props.plan;

  return (
    <div className="plan_component">
      <div className="list-item-top">
        <p className="plan__status-value">{status}</p>
        <Link
          onClick={() => props.onRemove(id)}
          className="list-item-top__remove"
        >
          X
        </Link>
      </div>
      <Link to={`/plans/edit?id=${id}`} className="list-item">
        {/* <p>id: {id}</p> */}

        <p className="list-item__title">{title}</p>
        <div className="list-item__description">
          <p>Uninterrupted Supply</p>
          <p>Unlimited Watch Time</p>
          <p>{description}</p>
        </div>

        <div className="list-item__price">
          <p>Price:</p>
          <p>&#8377;{price / 100}</p>
        </div>
        <div className="list-item__validity">
          <p>Validity:</p>
          <p>{moment.duration(validityPeriod, "milliseconds").asDays()} Days</p>
        </div>
        {/* <p className="plan__create_at">
            Created On: {moment(createdAt).format()}
          </p> */}
      </Link>
    </div>
  );
};

export default Plan;
