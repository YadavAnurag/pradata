import React from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import queryString from "query-string";

import Usage from "./Usage";

const UsageList = (props) => {
  // find id of plan
  const history = useHistory();
  const { id: userId } = queryString.parse(history.location.search);

  return (
    <div>
      <h1>ALL Usages</h1>
      {props.usages.map((usage, key) => (
        <Usage key={key} usage={usage} userId={userId} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};
export default connect(mapStateToProps)(UsageList);
