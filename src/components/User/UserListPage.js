import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import UserList from "./UserList";
import { getSelectedUsers } from "../../store/selectors/index";
import UserFilters from "../Filter/UserFilters";
import UsersSummary from "./UsersSummary";

import {
  initSetUsers, initSetPlans
} from "../../store/actions/index";

const UserListPage = (props) => {

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

  const selectedUsers = getSelectedUsers(props.users, props.plans, props.userFilters);
  const jsx =
    <div>
      <UsersSummary />
      <UserFilters />
      <UserList users={selectedUsers} />
    </div>
  ;
  return (
    <div>
      {(fetchedUsers && fetchedPlans) ? (
        jsx
      ) : (
        jsx
      )}
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    plans: state.plans,
    userFilters: state.userFilters
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onInitSetPlans: () => dispatch(initSetPlans()),
    onInitSetUsers: () => dispatch(initSetUsers())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserListPage);
