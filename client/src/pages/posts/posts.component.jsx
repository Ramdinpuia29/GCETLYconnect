import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Center, Stack } from "@mantine/core";

import PostCard from "../../components/post-card/post-card.component";
import { getPosts } from "../../redux/post/post-actions";

import "./posts.styles.scss";
import CreatePost from "../../components/create-post/create-post.component";
import { useViewportSize } from "@mantine/hooks";

const Posts = ({ getPosts, post: { posts }, auth: { user } }) => {
  const { width } = useViewportSize();
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Center>
      <Stack sx={{ width: width > 768 ? "50%" : "90%" }}>
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
