import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import { getSelectedPlans } from "../../store/selectors/plan";

const PlansSummary = (props) => {
  const { planCount } = props;
  const planWord = planCount === 1 ? "plan" : "plans";

  return (
    // <div>
    //   <h3>
    //     Viewing <span>{planCount}</span> {planWord}
    //   </h3>
    //   <div>
    //     <Link to="/plans/add" className='button'>Add Plan</Link>
    //   </div>
    // </div>
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{planCount}</span> {planWord}{" "}
        </h1>
        <div className="page-header__actions">
          {props.isAdmin === true && (
            <Link to="/plans/add" className="button">
              Add Plan
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const selectedPlans = getSelectedPlans(state.plans, state.planFilters);
  return {
    planCount: selectedPlans.length,
    isAdmin: state.auth.isAdmin,
  };
};
export default connect(mapStateToProps)(PlansSummary);
