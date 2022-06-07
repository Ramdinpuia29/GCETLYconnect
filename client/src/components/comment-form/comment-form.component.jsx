import React, { useState } from "react";
import { connect } from "react-redux";

import {
  Box,
  Button,
  createStyles,
  InputWrapper,
  Textarea,
  Center,
} from "@mantine/core";

import { addComment } from "../../redux/post/post-actions";

import "./comment-form.styles.scss";

const useStyles = createStyles((theme) => ({
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
}));

const CommentForm = ({ auth, postId, addComment, commentRef }) => {
  const { classes } = useStyles();

  const [text, setText] = useState("");

  return (
    <Center>
      <Box className={classes.box}>
        <InputWrapper mt={10} label={`Comment as ${auth.user.name}`}>
          <Textarea
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            placeholder="Share your thoughts about this post..."
            autosize
            required
            minLength={10}
            ref={commentRef}
          />
          <Button
            mt={10}
            onClick={() => {
              addComment(postId, { text });
              setText("");
            }}
            disabled={text === "" ? true : false}
          >
            Comment
          </Button>
        </InputWrapper>
      </Box>
    </Center>
    // <div className="comment-form">
    //   <form
    //     className="form my-1"
    //     onSubmit={(e) => {
    //       e.preventDefault();
    //       addComment(postId, { text });
    //       setText("");
    //     }}
    //   >
    //     <textarea
    //       name="text"
    //       cols="30"
    //       rows="5"
    //       placeholder="Leave a comment"
    //       value={text}
    //       onChange={(e) => setText(e.target.value)}
    //       required
    //     />
    //     <button>
    //       Reply <i className="fas fa-reply ml-3" />
    //     </button>
    //   </form>
    // </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.user,
});

export default connect(mapStateToProps, { addComment })(CommentForm);
