import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const AdminRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated && props.isAdmin ? (
          <div>
            <Component {...props} />
          </div>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.userId,
  isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps)(AdminRoute);
