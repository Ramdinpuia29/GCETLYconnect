import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../redux/user/user-actions";

import "./login.styles.scss";
import { showNotification, updateNotification } from "@mantine/notifications";
import { Check } from "tabler-icons-react";

const LoginPage = ({ login, user: { isAuthenticated } }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
    showNotification({
      id: "login",
      loading: true,
      message: "Logging in...",
    });
  };

  // if (isAuthenticated) {
  //   navigate("/posts");
  // }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/posts");

      updateNotification({
        icon: <Check />,
        id: "login",
        message: "Logged in",
      });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container">
      <div className="form-container">
        <img src="./undraw_profile_pic_ic5t.svg" alt="" />
        <h1>Welcome</h1>
        <form onSubmit={onSubmit}>
          <div>
            <input
              className="input-form"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div>
            <input
              className="input-form"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              minLength="8"
            />
          </div>
          <div></div>
          <button>LOGIN</button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { login })(LoginPage);
