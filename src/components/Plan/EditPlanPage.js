import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";
import { toast } from "react-toastify";

import { editPlan } from "../../store/actions/index";
import PlanForm from "./PlanForm";

export const EditPlanPage = (props) => {
  const history = useHistory();
  // find id of plan
  const { id: planId } = queryString.parse(history.location.search);
  const plan = props.plans.find(({ id }) => id === planId);

  const onSubmit = (updates) => {
    console.log("[EditPlanPage] - submitted", planId, updates);
    props.editPlan(planId, updates);
    history.push("/plans");
    toast.info("Plan Updated");
  };

  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <div className="page-header__title">
            <h1>Edit Plan</h1>
          </div>
        </div>
      </div>
      <div className="content-container">
        <PlanForm onSubmit={onSubmit} plan={plan} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  plans: state.plans,
});
const mapDispatchToProps = (dispatch) => ({
  editPlan: (id, updates) => dispatch(editPlan({ id, updates })),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditPlanPage);
