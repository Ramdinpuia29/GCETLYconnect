import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import {
  createStyles,
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Paper,
  Center,
  Menu,
} from "@mantine/core";

import { connect } from "react-redux";

import { deleteComment } from "../../redux/post/post-actions";

import "./comment-card.styles.scss";
import { Trash } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.sm}px ${theme.spacing.sm}px`,
    width: `100%`,
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    "& > p:last-child": {
      marginBottom: 0,
    },
  },
}));

const CommentCard = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
}) => {
  const { classes } = useStyles();
  return (
    <Center>
      <Paper withBorder radius="md" className={classes.comment} my={10}>
        <Group>
          <Link to={`/profile/${user}`}>
            <Avatar src={avatar} alt={name} radius="xl" />
          </Link>
          <div className={classes.topRow}>
            <div>
              <Text size="sm" weight="bold">
                {name}
              </Text>

              <Text size="xs" color="dimmed">
                <Moment fromNow ago>
                  {date}
                </Moment>{" "}
                ago
              </Text>
            </div>
          </div>
          <div>
            {auth.user._id === user ? (
              <Menu>
                <Menu.Item
                  icon={<Trash size={14} />}
                  onClick={() => deleteComment(postId, _id)}
                >
                  Delete comment
                </Menu.Item>
              </Menu>
            ) : null}
          </div>
        </Group>
        <TypographyStylesProvider className={classes.body}>
          <div
            className={classes.content}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </TypographyStylesProvider>
      </Paper>
    </Center>
    // <div className="comment-card row ">
    //   <div className="col-lg-2 first">
    //     <Link to={`/profile/${user}`}>
    //       <img className="round-img" src={avatar} alt="" />
    //       <h4>{name}</h4>
    //     </Link>
    //     {!auth.loading && user === auth.user._id && (
    //       <button
    //         onClick={() => deleteComment(postId, _id)}
    //         type="button"
    //         className="btn-danger"
    //       >
    //         <i className="far fa-trash-alt" />
    //       </button>
    //     )}
    //   </div>

    //   <div className="col-lg-8 mt-4">
    //     <p className="mb-4">{text}</p>
    //   </div>

    //   <div className="col-lg-2 third">
    //     <p className="post-date">
    //       Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
    //     </p>
    //   </div>
    // </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.user,
});

export default connect(mapStateToProps, { deleteComment })(CommentCard);
