import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Header from "../Header/Header";
import digiPic from "../../assets/images/digi.png";
import fastPic from "../../assets/images/fast.png";
import securedPic from "../../assets/images/secured.png";
import historyPic from "../../assets/images/history.png";
import profilePic from "../../assets/images/profile.png";

import { initLogin, initSetUsers } from "../../store/actions";

const HomePage = (props) => {
  console.log("loginButton", JSON.parse(localStorage.getItem("auth")));
  return (
    <div>
      <Header />
      {/* <p>Home, Let's Start Coding... and make self-reliant Digital India</p> */}
      <div className="home-header-content">
        {/* <img src={connectPic} alt="connect"></img> */}
        <div className="home-header">
          <h3>Pradata</h3>
          <h2>Fast and Secure</h2>
          <h2>cable TV connection</h2>

          {JSON.parse(localStorage.getItem("auth")).userId === "" ? (
            <Link to={`/login`} className="button home-header__button">
              Login
            </Link>
          ) : (
            <Link to={`/plans`} className="button home-header__button">
              Plans
            </Link>
          )}
        </div>
        <div className="home-header-image">
          <img src={digiPic} alt="connect"></img>
        </div>
      </div>
      <div className="card-content">
        <div className="card">
          <div className="card__left">
            <h4>Fast Content Delivery</h4>
            <p>
              With Pradata, very fast content delivery. Watch your favourites
              channels seamlessly, without any buffering. We promise to deliver
              contents on real-time.
            </p>
          </div>
          <div className="card__right">
            <img src={fastPic} alt="fast"></img>
          </div>
        </div>
        <hr className="card-divider" />
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
        <hr className="card-divider" />
        <div className="card">
          <div className="card__left">
            <h4>Track Your Plans History</h4>
            <p>
              With Pradata, we offer customers to see all their current and
              previous plans with themselves. So they can plan their payroll and
              management for their future and family.
            </p>
          </div>
          <div className="card__right">
            <img src={historyPic} alt="history"></img>
          </div>
        </div>
        <hr className="card-divider" />
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
  );
};

// const mapStateToProps = (state) => {
//   return {
//     users: state.users,
//   };
// };
const mapDispatchToProps = (dispatch) => {
  return {
    onInitLogin: (id) => dispatch(initLogin({ id })),
    onInitSetUsers: () => dispatch(initSetUsers()),
  };
};
export default connect(undefined, mapDispatchToProps)(HomePage);
