import React from "react";
import { connect } from "react-redux";

import Navigation from "../Navigation/Navigation";
import { initLogout } from "../../store/actions/index";

export const Header = (props) => {
  return (
    <header>
      <Navigation initLogout={props.initLogout} />
    </header>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    initLogout: () => dispatch(initLogout()),
  };
};
export default connect(undefined, mapDispatchToProps)(Header);
