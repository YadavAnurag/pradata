import React from "react";
import { connect } from "react-redux";

import PlanList from "./PlanList";
import { getSelectedPlans } from "../../store/selectors/index";

const PlanListPage = (props) => {
  return (
    <div>
      <PlanList plans={props.plans} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    plans: getSelectedPlans(state.plans, state.planFilters),
  };
};
export default connect(mapStateToProps)(PlanListPage);
