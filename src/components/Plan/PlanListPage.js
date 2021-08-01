import React from "react";
import { connect } from "react-redux";

import PlanList from "./PlanList";
import { getSelectedPlans } from "../../store/selectors/index";
import PlanFilters from "../Filter/PlanFilters";

const PlanListPage = (props) => {
  const jsx = (
    <div>
      <PlanFilters />
      {props.plans.length === 0 ? (
        <p>No plans to show...</p>
      ) : (
        <React.Fragment>
          <p>Showing {props.plans.length} Plans</p>
          <PlanList plans={props.plans} />
        </React.Fragment>
      )}
    </div>
  );

  return jsx;
};

const mapStateToProps = (state) => {
  return {
    plans: getSelectedPlans(state.plans, state.planFilters),
  };
};
export default connect(mapStateToProps)(PlanListPage);
