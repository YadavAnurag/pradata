import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";
import { toast } from "react-toastify";

import { initEditPlan } from "../../store/actions/index";
import PlanForm from "./PlanForm";

export const EditPlanPage = (props) => {
  const history = useHistory();
  // find id of plan
  const { id: planId } = queryString.parse(history.location.search);
  const plan = props.plans.find(({ id }) => id === planId);

  const toastId = React.useRef(null);
  const onSubmit = (updates) => {
    console.log("[EditPlanPage] - submitted", planId, updates);
    toastId.current = toast.loading("Updating Plan...");
    props
      .onInitEditPlan(planId, updates)
      .then((payload) => {
        if (payload.error !== null) {
          toast.dismiss(toastId.current);
          toast.error(payload.msg, { delay: 300 });
        } else {
          toast.dismiss(toastId.current);
          toast.success("Plan Updated", { delay: 300 });
          history.push("/plans");
        }
      })
      .catch((err) => {
        toast.dismiss(toastId.current);
        toast.error(err.message);
      });
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
  onInitEditPlan: (id, updates) => dispatch(initEditPlan({ id, updates })),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditPlanPage);
