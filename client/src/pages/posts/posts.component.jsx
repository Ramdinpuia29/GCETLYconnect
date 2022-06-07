import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Center, Stack } from "@mantine/core";

import PostCard from "../../components/post-card/post-card.component";
import PostForm from "../../components/post-form/post-form.component";
import { getPosts } from "../../redux/post/post-actions";

import "./posts.styles.scss";
import CreatePost from "../../components/create-post/create-post.component";

const Posts = ({ getPosts, post: { posts }, auth: { user } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Center>
      <Stack sx={{ width: "50%" }}>
        <CreatePost user={user} />
        {/* <PostForm /> */}

        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </Stack>
    </Center>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.user,
});

export default connect(mapStateToProps, { getPosts })(Posts);
