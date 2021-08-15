import React from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import queryString from "query-string";

import Usage from "./Usage";

const UsageList = (props) => {
  // find id of plan
  const history = useHistory();
  const { userId } = queryString.parse(history.location.search);
  const user = props.users.find((user) => user.id === userId);

  return (
    <div>
      <h1>ALL Usages</h1>
      {props.usages.map((usage, key) => (
        <Usage key={key} usage={usage} user={user} plans={props.plans} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    plans: state.plans,
  };
};
export default connect(mapStateToProps)(UsageList);
