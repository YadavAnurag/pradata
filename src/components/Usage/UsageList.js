import React from "react";

import Usage from "./Usage";

const UsageList = (props) => {
  return (
    <div>
      {props.usages.map((usage, key) => (
        <Usage usage={usage} />
      ))}
    </div>
  );
};

export default UsageList;
