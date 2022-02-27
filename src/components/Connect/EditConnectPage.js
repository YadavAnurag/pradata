import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import { initEditConnect } from "../../store/actions/index";
import ConnectForm from "./ConnectForm";

export const EditPlanPage = (props) => {
  const history = useHistory();

  const onSubmit = (updates) => {
    console.log("[EditConnectPage] - submitted", updates);
    props.onInitEditConnect(updates);
    history.push("/connect");
    toast.info("Connect Us Updated");
  };

  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <div className="page-header__title">
            <h1>Edit Connect Us Data</h1>
          </div>
        </div>
      </div>
      <div className="content-container connect-form__parent">
        <ConnectForm onSubmit={onSubmit} connectData={props.connectData} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  connectData: state.connect,
});
const mapDispatchToProps = (dispatch) => ({
  onInitEditConnect: (updates) => dispatch(initEditConnect({ updates })),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditPlanPage);
