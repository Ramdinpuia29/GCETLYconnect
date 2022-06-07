import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Moment from "react-moment";

import {
  Avatar,
  Box,
  Button,
  createStyles,
  Group,
  Menu,
  Spoiler,
  Text,
  TypographyStylesProvider,
  useMantineTheme,
  Center,
} from "@mantine/core";
import {
  Edit,
  MessageCircle,
  MessageReport,
  Share,
  ThumbUp,
  Trash,
} from "tabler-icons-react";

import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../redux/post/post-actions";

import "./post-card.styles.scss";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: "2em",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderRadius: theme.radius.md,
  },

  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    padding: theme.spacing.sm,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[2],
    textAlign: "left",
    borderRadius: theme.radius.md,
    width: "100%",
  },

  postOption: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[1],
    },
    height: "25px",
    width: "25px",
    borderRadius: "50%",
    zIndex: 2,
  },

  postHeading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing.sm,
    borderRadius: theme.radius.md,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[0],
    textDecoration: "none",
  },

  postTitle: {
    cursor: "pointer",
  },

  postContent: {
    marginTop: theme.spacing.lg,
  },

  button: {
    borderRadius: 0,

    "&:not(:first-of-type)": {
      borderLeftWidth: 0,
    },

    "&:first-of-type": {
      borderTopLeftRadius: theme.radius.sm,
      borderBottomLeftRadius: theme.radius.sm,
    },

    "&:last-of-type": {
      borderTopRightRadius: theme.radius.sm,
      borderBottomRightRadius: theme.radius.sm,
    },
  },
}));

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, title, text, name, avatar, user, likes, comments, date },
}) => {
  // console.log(likes.find((like) => like.user === auth.user._id));
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { colors, colorScheme } = useMantineTheme();

  const [like, setLike] = useState(false);

  useEffect(() => {
    if (likes.find((like) => like.user === auth.user._id)) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [likes, auth.user._id]);

  return (
    <Center>
      <div className={classes.container}>
        <Box className={classes.box}>
          <div className={classes.postHeading}>
            <Link to={`/profile/${user}`}>
              <Avatar size={50} radius={50} mr={10} src={avatar} />
            </Link>
            <Link to={`/posts/${_id}`}>
              <Text className={classes.postTitle} size="lg" weight={700}>
                {title}
              </Text>
            </Link>
            <div className={classes.postOption}>
              <Menu position="bottom" placement="end">
                {/* Render below 2 Menu.Item only if the user is the Author of the post */}
                {auth.user._id === user ? (
                  <>
                    <Menu.Item icon={<Edit size={14} />}>Edit post</Menu.Item>
                    <Menu.Item
                      icon={<Trash size={14} />}
                      onClick={() => deletePost(_id)}
                    >
                      Delete post
                    </Menu.Item>
                  </>
                ) : null}
                <Menu.Item icon={<MessageReport size={14} />}>Report</Menu.Item>
              </Menu>
            </div>
          </div>
          <div className={classes.postContent}>
            <Spoiler
              maxHeight={600}
              showLabel="Show more"
              hideLabel="Hide"
              transitionDuration={0}
            >
              <TypographyStylesProvider>
                <div dangerouslySetInnerHTML={{ __html: text }} />
              </TypographyStylesProvider>
            </Spoiler>
          </div>

          <Group position="right">
            <Text size="xs" color="dimmed">
              Posted{" "}
              <Moment fromNow ago>
                {date}
              </Moment>{" "}
              ago
            </Text>
          </Group>

          <Group position="left" grow spacing={5}>
            <Button
              leftIcon={
                <ThumbUp
                  stroke={
                    like
                      ? colors.blue[3]
                      : colorScheme === "dark"
                      ? "white"
                      : "black"
                  }
                />
              }
              variant="default"
              className={classes.button}
              onClick={() => (like ? removeLike(_id) : addLike(_id))}
              color={like ? colors.blue[9] : "black"}
            >
              {!like ? "Like" : "Unlike"}
            </Button>

            <Button
              leftIcon={<MessageCircle />}
              variant="default"
              className={classes.button}
              onClick={() => {
                navigate(`/posts/${_id}`);
              }}
            >
              Comments {comments.length > 0 ? `(${comments.length})` : null}
            </Button>

            <Button
              leftIcon={<Share />}
              variant="default"
              className={classes.button}
            >
              Share
            </Button>
          </Group>
        </Box>
      </div>
    </Center>
  );
};
// <div className="post-card row ">
//   <div className="col-lg-2 first">
//     <Link to={`/profile/${user}`}>
//       <img className="round-img" src={avatar} alt="" />
//       <h4>{name}</h4>
//     </Link>
//     {!auth.loading && user === auth.user._id && (
//       <button
//         onClick={() => deletePost(_id)}
//         type="button"
//         className="btn-danger"
//       >
//         <i className="far fa-trash-alt" />
//       </button>
//     )}
//   </div>

//   <div className="col-lg-8 align-self-end">
//     <h4>{title}</h4>
//     <p className="mb-4">{text}</p>
//     <div className="discussion">
//       <Link to={`/posts/${_id}`}>
//         View Discussion{" "}
//         {comments.length > 0 && (
//           <span className="comment-count">{comments.length}</span>
//         )}
//       </Link>
//     </div>
//   </div>

//   <div className="col-lg-2 third">
//     <p className="post-date">
//       Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
//     </p>
//     <div className="likes">
//       <button
//         onClick={() => addLike(_id)}
//         type="button"
//         className="border-none mx-1"
//       >
//         <i className="fas fa-arrow-up" />{" "}
//         <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
//       </button>
//       <button
//         onClick={() => removeLike(_id)}
//         type="button"
//         className="border-none mx-1"
//       >
//         <i className="fas fa-arrow-down" />
//       </button>
//     </div>
//   </div>
// </div>
// );

const mapStateToProps = (state) => ({
  auth: state.user,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
