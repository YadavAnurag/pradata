import React, {useState, useEffect} from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import queryString from "query-string";
import { toast } from "react-toastify";

import { initAddUsage, initSetUsers, initSetPlans } from "../../store/actions/index";
import UsageForm from "./UsageForm";

export const AddUsagePage = (props) => {
  const history = useHistory();
  const { userId } = queryString.parse(history.location.search);

  // fetch
  const [fetchedUsers, setFetchedUsers] = useState(props.users.length !== 0);
  const [fetchedPlans, setFetchedPlans] = useState(props.plans.length !== 0);
  useEffect(() => {
    if(!fetchedUsers){
      props.onInitSetUsers().then(() => setFetchedUsers(true));
    }
    if(!fetchedPlans){
      props.onInitSetPlans().then(() => setFetchedPlans(true));
    }
  }, [fetchedUsers, fetchedPlans]);


  const toastId = React.useRef(null);
  const onSubmit = ({ planId, paymentDetails }) => {
    toastId.current = toast.loading("Renewing Plan...");
    props
      .onInitAddUsage({ userId, planId, paymentDetails })
      .then((payload) => {
        if (payload.error !== null) {
          toast.dismiss(toastId.current);
          toast.error(payload.msg, { delay: 300 });
        } else {
          toast.dismiss(toastId.current);
          toast.success("Plan Renewed", { delay: 300 });
          history.goBack();
        }
      })
      .catch((err) => {
        toast.dismiss(toastId.current);
        toast.error(err.message);
      });
  };

  const jsx =
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
  ;
  return (
    <div>
      {(fetchedUsers && fetchedPlans) ? (
        jsx
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    plans: state.plans,
    users: state.users
  };
};
const mapDispatchToProps = (dispatch) => ({
  onInitAddUsage: ({ userId, planId, paymentDetails }) =>
    dispatch(initAddUsage({ userId, planId, paymentDetails })),
    onInitSetUsers: () => dispatch(initSetUsers()),
    onInitSetPlans: () => dispatch(initSetPlans())
});
export default connect(mapStateToProps, mapDispatchToProps)(AddUsagePage);
