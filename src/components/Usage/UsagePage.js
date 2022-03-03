import React, {useState, useEffect} from "react";
import { useLocation } from "react-router";
import queryString from "query-string";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import UsageList from "./UsageList";
import User from "../User/User";

import {initSetUsers, initSetPlans} from "../../store/actions/index";

const UsagePage = (props) => {
  const location = useLocation();
  const { userId } = queryString.parse(location.search);
  const user = props.users.find((user) => {
    return user.id === userId;
  });

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


  return (
    <div style={{ paddingBottom: "3rem" }}>
      {(fetchedUsers && fetchedPlans) ? (
        <div className="content-container">
          <User user={user} />
          <div>
            {props.isAdmin && (
              <div className="header-buttons">
                <Link to={`/users/edit?id=${userId}`} className="button">
                  Edit
                </Link>
                <Link to={`/users/renew?userId=${userId}`} className="button">
                  Renew Plan
                </Link>
              </div>
            )}
          </div>
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
    users: state.users,
    plans: state.plans,
    isAdmin: state.auth.isAdmin,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onInitSetUsers: () => dispatch(initSetUsers()),
    onInitSetPlans: () => dispatch(initSetPlans())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UsagePage);
