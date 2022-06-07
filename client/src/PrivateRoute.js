import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "./components/Spinner/Spinner.component";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Routes>
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <Spinner />
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  </Routes>
);

const mapStateToProps = (state) => ({
  auth: state.user,
});

export default connect(mapStateToProps)(PrivateRoute);
