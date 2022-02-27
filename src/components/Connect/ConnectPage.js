import React from "react";
import { connect } from "react-redux";

import { initSetConnect } from "../../store/actions/index";

const ConnectPage = (props) => {
  React.useEffect(() => {
    if (Object.keys(props.connectData).length === 0) {
      props.onInitSetConnect();
    }
  }, []);

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Connect with us...</h1>
        <h3>
          asdf
          {/* hidden <span>{usersCount}</span> {userWord} */}
          {/* {hiddenUsersCount > 0 && <span>, hidden {hiddenUsersCount}</span>} */}
        </h3>
        <div className="page-header__actions">
          {/* <Link to="/users/add" className="button">
            Add User
          </Link> */}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    connectData: state.connect,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onInitSetConnect: () => dispatch(initSetConnect()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ConnectPage);
