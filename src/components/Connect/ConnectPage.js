import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { initSetConnect } from "../../store/actions/index";

const ConnectPage = (props) => {
  const {
    title,
    subTitle,
    description,
    name,
    contactNumber,
    emailId,
    address,
    locationURL,
  } = props.connectData;

  const [fetchedConnect, setFetchedConnect] = useState(Object.keys(props.connectData).length !== 0);
  useEffect(() => {
    if (!fetchedConnect) {
      props.onInitSetConnect().then(() => setFetchedConnect(true));
    }
  }, [fetchedConnect]);

  const jsx = (
    <div className="page-header page-header-connect">
      <div className="content-container content-container__connect">
        <h1 className="page-header__title">{title}</h1>
        <h3>{subTitle}</h3>
        <p>{description}</p>
      </div>
      <div className="content-container content-container__connect connect__bottom">
        <div className="connect-location">
          <iframe
            title={"unique"}
            src={locationURL}
            loading="lazy"
            className="location-frame"
          ></iframe>
        </div>
        <div className="connect-details">
          <div>
            <p>Name :</p>
            <p>{name}</p>
          </div>
          <div>
            <p>Address :</p>
            <p>{address}</p>
          </div>
          <div>
            <p>Contact :</p>
            <p>{contactNumber}</p>
            <p>{emailId}</p>
          </div>
        </div>
      </div>
    </div>
  );
  return props.isAdmin ? <Link to={"/connect/edit"}>{jsx}</Link> : jsx;
};

const mapStateToProps = (state) => {
  return {
    connectData: state.connect,
    isAdmin: state.auth.isAdmin,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onInitSetConnect: () => dispatch(initSetConnect()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ConnectPage);
