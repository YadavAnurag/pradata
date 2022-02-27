import React from "react";

import Plan from "./Plan";

const PlanList = (props) => {
  return (
    <div className="content-container">
      {/* <div className="plan-list">
        {props.plans.map((plan, key) => {
          return <Plan key={key} plan={plan} onRemove={props.onRemove} />;
        })}
      </div> */}

      <div className="list-header">
        <div className="show-for-desktop">Plans</div>
        {/* <div className="show-for-mobile">Plans</div> */}
        {/* <div className='show-for-mobile'>Amount</div> */}
      </div>
      <div className="list-body">
        {props.plans.length === 0 ? (
          <div className="list-item list-item--message">
            <span>
              <p>No Plans</p>
            </span>
          </div>
        ) : (
          props.plans.map((plan, key) => {
            return (
              <Plan
                key={key}
                plan={plan}
                onRemove={props.onRemove}
                isAdmin={props.isAdmin}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default PlanList;
