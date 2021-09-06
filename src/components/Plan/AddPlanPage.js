import React from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";

import { initAddPlan } from "../../store/actions/index";
import PlanForm from "./PlanForm";

export const AddPlanPage = (props) => {
  const history = useHistory();

  const onSubmit = (plan) => {
    console.log("[AddPlanPage] - submitted", plan);
    props.onInitAddPlan(plan);
    history.push("/plans");
  };

  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <div className="page-header__title">
            <h1>Add Plan</h1>
          </div>
        </div>
      </div>
      <div className="content-container">
        <PlanForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onInitAddPlan: (plan) => dispatch(initAddPlan(plan)),
});
export default connect(undefined, mapDispatchToProps)(AddPlanPage);
