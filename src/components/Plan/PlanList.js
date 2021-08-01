import React from "react";

import Plan from "./Plan";

const PlanList = (props) => {
  return (
    <div>
      {props.plans.map((plan, key) => {
        return <Plan key={key} plan={plan} />;
      })}
    </div>
  );
};

export default PlanList;
