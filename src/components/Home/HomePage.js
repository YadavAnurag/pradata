import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import digiPic from "../../assets/images/digi.png";
import fastPic from "../../assets/images/fast.png";
import securedPic from "../../assets/images/secured.png";
import historyPic from "../../assets/images/history.png";
import profilePic from "../../assets/images/profile.png";

import { initLogin, initSetUsers, initSetPlans } from "../../store/actions";

// check if localStorage contains userId
const parsedLocalStorage = JSON.parse(localStorage.getItem("auth"));
const isAuthAvailableInLocalStorage = localStorage.length &&
  (parsedLocalStorage !== null);
const userId = isAuthAvailableInLocalStorage ? parsedLocalStorage.userId : "";

const HomePage = (props) => {

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
    <div>
      {/* <Header /> */}
      <div className="home-page-container">
        {/* <p>Home, Let's Start Coding... and make self-reliant Digital India</p> */}
        <div className="home-header-content">
          {/* <img src={connectPic} alt="connect"></img> */}
          <div className="home-header">
            <h3>Pradata</h3>
            <h2>Fast and Secure</h2>
            <h2>cable TV connection</h2>

            {userId === "" ? (
              <div className="home-header__button-parent">
                <Link to={`/plans`} className="button home-header__button first">
                  Plans
                </Link>
                <Link to={`/connect`} className="button home-header__button second">
                  Connect
                </Link>
              </div>
            ) : (
              <div className="home-header__button-parent">
                <Link to={`/dashboard`} className="button home-header__button first">
                  Dashboard
                </Link>
                <Link to={`/plans`} className="button home-header__button second">
                  Plans
                </Link>
              </div>
            )}
          </div>
          <div className="home-header-image">
            <img src={digiPic} alt="connect"></img>
          </div>
        </div>
        <div className="card-content">
          <div className="card">
            <div className="card__left">
              <h4>Real-time Content Delivery</h4>
              <p>
                With Pradata, very fast content delivery. Watch your favourites
                channels seamlessly, without any buffering. We promise to
                deliver contents on real-time.
              </p>
            </div>
            <div className="card__right">
              <img src={fastPic} alt="fast"></img>
            </div>
          </div>
          {/* <hr className="card-divider" /> */}
          <div className="card">
            <div className="card__left">
              <h4>Secured Connection and Cable Management</h4>
              <p>
                With Pradata, get secured connection and hassle free cable
                delivery to your house. We take care of all cable management,
                problems will be resolved with in same day.
              </p>
            </div>
            <div className="card__right">
              <img src={securedPic} alt="secured"></img>
            </div>
          </div>
          {/* <hr className="card-divider" /> */}
          <div className="card">
            <div className="card__left">
              <h4>Track Your Plans History</h4>
              <p>
                With Pradata, we offer customers to see all their current and
                previous plans with themselves. So they can plan their payroll
                and management for their future and family.
              </p>
            </div>
            <div className="card__right">
              <img src={historyPic} alt="history"></img>
            </div>
          </div>
          {/* <hr className="card-divider" /> */}
          <div className="card">
            <div className="card__left">
              <h4>Personal Profile Management</h4>
              <p>
                With Pradata, we offer a personalized dashboard and profile
                section to every customer. They can keep track on their current
                plans, profile and a lot others.
              </p>
            </div>
            <div className="card__right">
              <img src={profilePic} alt="profile"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    plans: state.plans
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onInitLogin: (id) => dispatch(initLogin({ id })),
    onInitSetUsers: () => dispatch(initSetUsers()),
    onInitSetPlans: () => dispatch(initSetPlans())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
