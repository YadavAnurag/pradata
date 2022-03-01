import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import { initEditConnect } from "../../store/actions/index";
import ConnectForm from "./ConnectForm";

export const EditPlanPage = (props) => {
  const history = useHistory();

  const toastId = React.useRef(null);
  const onSubmit = (updates) => {
    toastId.current = toast.loading("Saving...");
    props
      .onInitEditConnect(updates)
      .then((payload) => {
        if (payload.error !== null) {
          toast.dismiss(toastId.current);
          toast.error(payload.msg, { delay: 300 });
        } else {
          toast.dismiss(toastId.current);
          toast.success("Updated !", { delay: 300 });
          history.push("/connect");
        }
      })
      .catch((err) => {
        toast.dismiss(toastId.current);
        toast.error(err.message);
      });
  };

  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <div className="page-header__title">
            <h1 className="page-header__title">Edit Connect Us Data</h1>
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
