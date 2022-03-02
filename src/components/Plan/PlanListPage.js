import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import PlanList from "./PlanList";
import { getSelectedPlans } from "../../store/selectors/index";
import PlanFilters from "../Filter/PlanFilters";
import PlansSummary from "./PlansSummary";
import { initRemovePlan, initSetPlans } from "../../store/actions/plan/plan";

const PlanListPage = (props) => {
  const history = useHistory();

  // fetch plans when plans page loads
  React.useEffect(() => {
    if (Object.keys(props.plans).length === 0) {
      props.onInitSetPlan();
    }
  }, []);

  const toastId = React.useRef(null);
  const onRemove = (id) => {
    toastId.current = toast.loading("Updating Plan...");
    props
      .onInitRemovePlan(id)
      .then((payload) => {
        if (payload.error !== null) {
          toast.dismiss(toastId.current);
          toast.error(payload.msg, { delay: 300 });
        } else {
          toast.dismiss(toastId.current);
          toast.info("Plan Removed", { delay: 300 });
          history.push("/plans");
        }
      })
      .catch((err) => {
        toast.dismiss(toastId.current);
        toast.error(err.message);
      });
  };

  const jsx = (
    <div style={{ paddingBottom: "3rem" }}>
      <PlansSummary />
      <PlanFilters />
      <PlanList
        plans={getSelectedPlans(props.plans, props.planFilters)}
        onRemove={onRemove}
        isAdmin={props.isAdmin}
      />
    </div>
  );

  return jsx;
};

const mapStateToProps = (state) => {
  return {
    plans: state.plans,
    planFilters: state.planFilters,
    isAdmin: state.auth.isAdmin,
  };
};
const mapDispatchToProps = (dispatch) => ({
  onInitRemovePlan: (id) => dispatch(initRemovePlan({ id })),
  onInitSetPlan: () => dispatch(initSetPlans()),
});
export default connect(mapStateToProps, mapDispatchToProps)(PlanListPage);
