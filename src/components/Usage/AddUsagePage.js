import React from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import queryString from "query-string";
import { toast } from "react-toastify";

import { initAddUsage } from "../../store/actions/index";
import UsageForm from "./UsageForm";

export const AddUsagePage = (props) => {
  const history = useHistory();
  const { userId } = queryString.parse(history.location.search);

  const onSubmit = ({ planId, paymentDetails }) => {
    console.log("[AddUsagePage] - submitted", planId);
    props
      .onInitAddUsage({ userId, planId, paymentDetails })
      .then(() => {
        toast.success("Plan Renewed Successfully");
        history.goBack();
      })
      .catch((err) => {
        toast.error(err);
      });
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
  onInitAddUsage: ({ userId, planId, paymentDetails }) =>
    dispatch(initAddUsage({ userId, planId, paymentDetails })),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddUsagePage);
