import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { login } from "../../redux/user/user-actions";

import { showNotification, updateNotification } from "@mantine/notifications";
import { At, Check, Lock } from "tabler-icons-react";
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
} from "@mantine/core";
import { useForm, useViewportSize } from "@mantine/hooks";

const LoginPage = ({ login, user: { loading, isAuthenticated } }) => {
  const navigate = useNavigate();

  const onSubmit = ({ email, password }) => {
    login(email, password);
    showNotification({
      id: "login",
      loading: true,
      message: "Logging in...",
    });
  };
  useEffect(() => {
    if (isAuthenticated) {
      updateNotification({
        icon: <Check />,
        id: "login",
        message: "Logged in",
      });

      navigate("/posts");
    }
  }, [isAuthenticated, navigate]);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const { width } = useViewportSize();

  return (
    <Container>
      <Grid mt={20}>
        <Grid.Col span={width > 768 ? 4 : 12} sx={{ width: "100%" }}>
          <Paper radius="md" withBorder p="md" sx={{ height: "100%" }}>
            <Title>Login</Title>
            <form
              onSubmit={form.onSubmit((values) => {
                onSubmit(values);
              })}
            >
              <Stack>
                <TextInput
                  pt={20}
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
              </Stack>
              <Group mt={20} position="right">
                <Button type="submit">LOGIN</Button>
              </Group>
            </form>
          </Paper>
        </Grid.Col>
        {width >= 768 && (
          <Grid.Col span={8}>
            <Image
              radius="md"
              src="https://images.unsplash.com/photo-1455849318743-b2233052fcff"
              alt="login-image"
            />
          </Grid.Col>
        )}
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { login })(LoginPage);
