import React, {useEffect, useState} from "react";
import { connect } from "react-redux";

import UsageList from "../Usage/UsageList";
import {initSetUsers, initSetPlans} from "../../store/actions/index";

const UserPayment = (props) => {

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

  const user = props.users.find((user) => {
    return user.id === props.userId;
  });


  return (
    <div style={{ paddingBottom: "3rem" }}>
      {(fetchedUsers && fetchedPlans) ? (
        <div className="content-container">
          <div className="list-header">
            <div className="show-for-desktop">All Usages</div>
          </div>
          <UsageList usages={user.usages} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    users: state.users,
    plans: state.plans
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onInitSetPlans: () => dispatch(initSetPlans()),
    onInitSetUsers: () => dispatch(initSetUsers())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserPayment);
