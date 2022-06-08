import React from "react";

import "./error-boundary.styles.scss";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError(error) {
    // process the error
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <div className="error-boundary">
          <i className="fas fa-exclamation-triangle fa-4x text-danger"></i>
          <h1>An unexpected error occurred!</h1>
          <h3>
            {" "}
            Please try{" "}
            <span
              style={{
                cursor: "pointer",
                textDecoration: "underline",
                color: "#339af0",
              }}
              onClick={() => window.location.reload()}
            >
              refreshing{" "}
            </span>
            this page.
          </h3>
          <h4>If refreshing the page does not work</h4>
          <p>
            Contact us and let us know what happened, we will fix the error as
            soon as possible.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
