import React from "react";
import { useParams, useLocation, useHistory, u } from "react-router";
import queryString from "query-string";
import { connect } from "react-redux";

import Usage from "./Usage";

const UsagePage = (props) => {
  const location = useLocation();

  const { id: userId } = queryString.parse(location.search);
  const usages = props.users.find(({ id }) => id === userId).usages;

  console.log(usages);
  return (
    <div>
      UsagePage
      {usages.map((usage, key) => (
        <Usage key={key} usage={usage} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};
export default connect(mapStateToProps)(UsagePage);
