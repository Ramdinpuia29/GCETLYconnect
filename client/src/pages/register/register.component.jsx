import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import { showNotification, updateNotification } from "@mantine/notifications";
import {
  At,
  Check,
  Lock,
  LockSquare,
  School,
  UserCircle,
} from "tabler-icons-react";
import {
  PasswordInput,
  TextInput,
  Container,
  Title,
  Grid,
  Stack,
  Button,
  Group,
  Image,
  Paper,
  Avatar,
  Text,
} from "@mantine/core";
import { useForm, useViewportSize } from "@mantine/hooks";

import { connect } from "react-redux";
import { register } from "../../redux/user/user-actions";
import { setAlert } from "../../redux/alert/alert-actions";

import "./register.styles.scss";

const RegisterPage = ({ register, isAuthenticated }) => {
  // eslint-disable-next-line no-unused-vars
  const [file, setFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      univId: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { width } = useViewportSize();

  const onSubmit = async ({ name, email, univId, password }, previewSource) => {
    if (password !== form.values.confirmPassword) {
      showNotification({
        color: "red",
        title: "Passwords does not match",
      });
    } else if (!previewSource) {
      showNotification({
        color: "red",
        title: "Please select your profile photo",
      });
    } else {
      register({ name, email, univId, password, previewSource });
      showNotification({
        id: "signup",
        loading: true,
        message: "Registering and logging in...",
      });
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    previewFile(file);
  };

  //get the file info and set previewSource to be seen as image
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const openRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/edit-profile");
      updateNotification({
        id: "signup",
        icon: <Check />,
        message: "Successfully registered",
      });
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Container>
        <Grid mt={20}>
          {width >= 768 && (
            <Grid.Col span={7}>
              <Image
                radius="md"
                src="https://images.unsplash.com/photo-1498079022511-d15614cb1c02"
                alt="login-image"
                height={565}
              />
            </Grid.Col>
          )}
          <Grid.Col span={width > 768 ? 5 : 12} sx={{ width: "100%" }}>
            <Paper radius="md" withBorder p="md" sx={{ height: "100%" }}>
              <Group position="apart" align="flex-start">
                <Title>Sign Up</Title>
                <Stack align="center">
                  <input
                    style={{ display: "none" }}
                    type="file"
                    ref={openRef}
                    onChange={handleFileInputChange}
                    required
                  />
                  <Avatar
                    radius="50%"
                    size="lg"
                    sx={{ cursor: "pointer" }}
                    src={previewSource}
                    onClick={() => openRef.current.click()}
                  />
                  <Text size="xs">
                    Choose profile photo
                    <span style={{ color: "#ff6b6b" }}>*</span>
                  </Text>
                </Stack>
              </Group>
              <form
                onSubmit={form.onSubmit((values) => {
                  onSubmit(values, previewSource);
                })}
              >
                <Stack>
                  <TextInput
                    label="Your name"
                    placeholder="Your fullname"
                    icon={<UserCircle size={14} />}
                    {...form.getInputProps("name")}
                    required
                  />
                  <TextInput
                    label="Your registration number"
                    placeholder="Your university registration number"
                    icon={<School size={14} />}
                    {...form.getInputProps("univId")}
                    required
                  />
                  <TextInput
                    label="Your email"
                    placeholder="Your email"
                    icon={<At size={14} />}
                    {...form.getInputProps("email")}
                    required
                  />
                  <PasswordInput
                    label="Your password"
                    placeholder="Your password"
                    icon={<Lock size={16} />}
                    {...form.getInputProps("password")}
                    required
                    minLength={8}
                  />
                  <PasswordInput
                    label="Confirm password"
                    placeholder="Confirm password"
                    icon={<LockSquare size={16} />}
                    {...form.getInputProps("confirmPassword")}
                    required
                    minLength={8}
                  />
                </Stack>
                <Group mt={20} position="right">
                  <Button type="submit">SIGN UP</Button>
                </Group>
              </form>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
      {/* <div className="register">
        <img src="./undraw_community_8nwl.svg" alt="" />
        <h1>Welcome</h1>
        <form onSubmit={onSubmit}>
          <div>
            <input
              className="input-form"
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <input
              className="input-form"
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Choose a profile photo</label>
            <input
              className="form-control-file"
              type="file"
              name="file"
              onChange={handleFileInputChange}
              required
            />
          </div>
          <div>
            {previewSource && (
              <img className="img-profile" src={previewSource} alt="chosen" />
            )}
          </div>
          <div>
            <input
              className="input-form"
              type="text"
              placeholder="Registration Number"
              name="univId"
              value={univId}
              onChange={onChange}
              minLength="9"
              required
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
              required
            />
          </div>
          <div>
            <input
              className="input-form"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              minLength="8"
              required
            />
          </div>
          <button>Register</button>
        </form>
      </div> */}
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, { register, setAlert })(RegisterPage);
