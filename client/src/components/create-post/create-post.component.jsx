import { createStyles, Box, Text, Avatar, Center } from "@mantine/core";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: "2em",
  },

  inputWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "3.5em",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    textAlign: "left",
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    cursor: "pointer",
    width: "100%",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },
  },
}));

const CreatePost = ({ auth }) => {
  const { classes } = useStyles();

  const navigate = useNavigate();

  return (
    <Center>
      <div className={classes.container}>
        <Link to={`/profile/${auth.user._id}`}>
          <Avatar size={50} radius={50} mr={10} src={auth.user.avatar} />
        </Link>

        <Box className={classes.box} onClick={() => navigate("/createPost")}>
          <Text size="sm" color="dimmed">
            Create new post...
          </Text>
        </Box>
      </div>
    </Center>
  );
};

const mapStateToProps = (state) => ({
  auth: state.user,
});

export default connect(mapStateToProps)(CreatePost);
