import React, { useState } from "react";
import { connect } from "react-redux";

import {
  Box,
  Button,
  Center,
  createStyles,
  Input,
  InputWrapper,
} from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";

import { addPost } from "../../redux/post/post-actions";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    padding: theme.spacing.sm,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[2],
    textAlign: "left",
    borderRadius: theme.radius.md,
  },
}));

const PostForm = ({ addPost }) => {
  const navigate = useNavigate();
  const { classes } = useStyles();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    addPost({ title, text });
    setTitle("");
    setText("");
    navigate("/posts");
  };

  const handleImageUpload = (file) =>
    new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("image", file);

      fetch(
        "http://api.imgbb.com/1/upload?key=df6e04bd10614d74eac2e0a164153be8",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json)
        .then((result) => resolve(result.data.url))
        .catch(() => reject(new Error("Upload failed")));
    });

  return (
    <Center>
      <Box mt={20} className={classes.box}>
        <InputWrapper label="CREATE NEW POST" size="lg">
          <Input
            placeholder="Title"
            value={title}
            rightSectionWidth={70}
            rightSection={`${title.length}/300`}
            maxLength={300}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <RichTextEditor
            mt={20}
            value={text}
            onChange={setText}
            placeholder="Share your ideas..."
            sticky
            sx={{ minHeight: "50vh" }}
            onImageUpload={handleImageUpload}
          />
        </InputWrapper>
        <Button
          mt={20}
          onClick={handleSubmit}
          disabled={title.length < 10 || text.length < 30 ? true : false}
        >
          Post
        </Button>
      </Box>
    </Center>
  );
};

export default connect(null, { addPost })(PostForm);
