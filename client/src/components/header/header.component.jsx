import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import {
  createStyles,
  Header,
  Group,
  Text,
  Container,
  Burger,
  Switch,
  useMantineColorScheme,
  Drawer,
} from "@mantine/core";
import { Sun, MoonStars } from "tabler-icons-react";
import { useBooleanToggle } from "@mantine/hooks";

import { logout } from "../../redux/user/user-actions";
import { clearProfile } from "../../redux/profile/profile-actions";

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    "& *": {
      cursor: "pointer",
    },
  },

  icon: {
    pointerEvents: "none",
    position: "absolute",
    zIndex: 1,
    top: 3,
  },

  iconLight: {
    left: 4,
    color: theme.white,
  },

  iconDark: {
    right: 4,
    color: theme.colors.gray[6],
  },
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,

    [theme.fn.smallerThan("sm")]: {
      justifyContent: "flex-start",
    },
  },

  links: {
    width: 260,

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  social: {
    width: 260,

    [theme.fn.smallerThan("sm")]: {
      width: "auto",
      marginLeft: "auto",
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color:
        theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 3 : 7],
    },
  },
}));

const authLinks = [
  { link: "/posts", label: "Posts" },
  { link: "/messages", label: "Messages" },
  {
    link: "/students",
    label: "Community",
  },
];

const guestLinks = [
  { link: "/login", label: "Login" },
  { link: "/register", label: "Register" },
];

const HeaderLayout = ({
  auth: { isAuthenticated, loading },
  logout,
  clearProfile,
}) => {
  const navigate = useNavigate();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [active, setActive] = useState(
    isAuthenticated ? authLinks[0].link : guestLinks[0].link
  );
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes, cx } = useStyles();

  const authItems = authLinks.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={cx(classes.link, active === link.link && classes.linkActive)}
      onClick={() => {
        setActive(link.link);
        toggleOpened(false);
        navigate(link.link);
      }}
    >
      {link.label}
    </Link>
  ));

  const guestItems = guestLinks.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={cx(classes.link, active === link.link && classes.linkActive)}
      onClick={() => {
        setActive(link.link);
        toggleOpened(false);
        navigate(link.link);
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <>
      <Header height={56}>
        <Container className={classes.inner}>
          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            size="sm"
            className={classes.burger}
          />
          <Group className={classes.links} spacing={5}>
            {!loading && <>{isAuthenticated ? authItems : guestItems}</>}
          </Group>
          <Link
            to="/"
            onClick={() => {
              setActive(authLinks[0].link);
            }}
          >
            <Text weight={600} size="xl" color={"blue"}>
              GCETLY
              <span
                style={{ color: colorScheme === "dark" ? "white" : "black" }}
              >
                connect
              </span>
            </Text>
          </Link>
          <Group spacing={0} className={classes.social} position="right" noWrap>
            {!loading && (
              <>
                {isAuthenticated ? (
                  <Link
                    to="/login"
                    className={cx(classes.link)}
                    onClick={() => {
                      logout();
                      clearProfile();
                      navigate("/login");
                    }}
                  >
                    Logout
                  </Link>
                ) : null}
              </>
            )}
            <div className={classes.root}>
              <Sun className={cx(classes.icon, classes.iconLight)} size={18} />
              <MoonStars
                className={cx(classes.icon, classes.iconDark)}
                size={18}
              />
              <Switch
                checked={colorScheme === "dark"}
                onChange={() => toggleColorScheme()}
                size="md"
              />
            </div>
          </Group>
        </Container>
      </Header>
      <Drawer
        opened={opened}
        onClose={() => toggleOpened()}
        title={
          <Text weight={600} size="xl" color={"blue"}>
            GCETLY<span style={{ color: "white" }}>connect</span>
          </Text>
        }
        padding="xl"
        size="md"
      >
        {!loading && <>{isAuthenticated ? authItems : guestItems}</>}
      </Drawer>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.user,
});

export default connect(mapStateToProps, { logout, clearProfile })(HeaderLayout);
