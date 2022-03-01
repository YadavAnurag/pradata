import React from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";

import { initAddPlan } from "../../store/actions/index";
import PlanForm from "./PlanForm";
import { toast } from "react-toastify";

export const AddPlanPage = (props) => {
  const history = useHistory();

  const toastId = React.useRef(null);
  const onSubmit = (plan) => {
    console.log("[AddPlanPage] - submitted", plan);
    toastId.current = toast.loading("Adding Plan...");
    props
      .onInitAddPlan(plan)
      .then((payload) => {
        if (payload.error !== null) {
          toast.dismiss(toastId.current);
          toast.error(payload.msg, { delay: 300 });
        } else {
          toast.dismiss(toastId.current);
          toast.success("Plan Added", { delay: 300 });
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
