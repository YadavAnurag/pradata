import React from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { addUsage } from "../../store/actions/index";
import queryString from "query-string";
import { toast } from "react-toastify";

import UsageForm from "./UsageForm";

export const AddUsagePage = (props) => {
  const history = useHistory();
  const { id: userId } = queryString.parse(history.location.search);

  const onSubmit = ({ planId, paymentDetails }) => {
    console.log("[AddUsagePage] - submitted", planId);
    props.addUsage({ userId, planId, paymentDetails });
    toast.success("Plan Renewed Successfully");
    history.goBack();
  };

  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <div className="page-header__title">
            <h1>Add Usage</h1>
          </div>
        </div>
      </div>
      <div className="content-container">
        <UsageForm onSubmit={onSubmit} plans={props.plans} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    plans: state.plans,
  };
};
const mapDispatchToProps = (dispatch) => ({
  addUsage: ({ userId, planId, paymentDetails }) =>
    dispatch(addUsage({ userId, planId, paymentDetails })),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddUsagePage);
