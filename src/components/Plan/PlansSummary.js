import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import { getSelectedPlans } from "../../store/selectors/plan";

const PlansSummary = (props) => {
  const { planCount } = props;
  const planWord = planCount === 1 ? "plan" : "plans";

  return (
    <div>
      <h3>
        Viewing <span>{planCount}</span> {planWord}
      </h3>
      <div>
        <Link to="/plans/add">Add Plan</Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const selectedPlans = getSelectedPlans(state.plans, state.planFilters);

  return {
    planCount: selectedPlans.length,
  };
};
export default connect(mapStateToProps)(PlansSummary);
