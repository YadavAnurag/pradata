import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const Plan = (props) => {
  const { id, title, price, status, description, validityPeriod, createdAt } =
    props.plan;

  return (
    <div className="plan_component">
      <div className="plan__status">
        {/* <p className="plan__status-text">status:</p> */}
        <p className="plan__status-value">{status}</p>
        <Link onClick={() => props.onRemove(id)} className="plan__remove">
          X
        </Link>
      </div>
      <div className="plan">
        <Link to={`/plans/edit?id=${id}`} className="plan__link">
          {/* <p>id: {id}</p> */}

          <p className="plan__title">{title}</p>
          <div className="plan__description">
            <p className="plan__description1">{description}</p>
            <p className="plan__description2">Uninterrupted Supply</p>
            <p className="plan__description3">Unlimited Watch Time</p>
          </div>

          <div className="plan__price">
            <p className="plan__price-text">Price:</p>
            <p className="plan__price-value">&#8377;{price / 100}</p>
          </div>
          <div className="plan__validity">
            <p className="plan__validity_period">Validity:</p>
            <p className="plan__validity_duration">
              {moment.duration(validityPeriod, "milliseconds").asDays()} Days
            </p>
          </div>
          {/* <p className="plan__create_at">
            Created On: {moment(createdAt).format()}
          </p> */}
        </Link>
      </div>
    </div>
  );
};

export default Plan;
