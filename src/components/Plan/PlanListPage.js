import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import PlanList from "./PlanList";
import { getSelectedPlans } from "../../store/selectors/index";
import PlanFilters from "../Filter/PlanFilters";
import PlansSummary from "./PlansSummary";
import { removePlan } from "../../store/actions/plan/plan";

const PlanListPage = (props) => {
  const history = useHistory();

  const onRemove = (id) => {
    props.removePlan(id);
    history.push("/plans");
  };

  const jsx = (
    <div>
      <PlansSummary />
      <PlanFilters />
      <PlanList plans={props.plans} onRemove={onRemove} />
    </div>
  );

  return jsx;
};

const mapStateToProps = (state) => {
  return {
    plans: getSelectedPlans(state.plans, state.planFilters),
  };
};
const mapDispatchToProps = (dispatch) => ({
  removePlan: (id) => dispatch(removePlan({ id })),
});
export default connect(mapStateToProps, mapDispatchToProps)(PlanListPage);
