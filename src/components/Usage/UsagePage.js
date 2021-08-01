import React from "react";
import { useParams, useLocation, useHistory, u } from "react-router";
import queryString from "query-string";
import { connect } from "react-redux";

import UsageList from "./UsageList";
import { getSelectedUsers } from "../../store/selectors/index";

const UsagePage = (props) => {
  const location = useLocation();

  const { id: userId } = queryString.parse(location.search);
  const usages = props.users.find(({ id }) => id === userId).usages;

  console.log(usages);
  return (
    <div>
      UsagePage
      <UsageList usages={usages} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: getSelectedUsers(state.users, state.plans, state.userFilters),
  };
};
export default connect(mapStateToProps)(UsagePage);
