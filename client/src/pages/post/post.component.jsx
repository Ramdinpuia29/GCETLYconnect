import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Center, Stack } from "@mantine/core";

import Spinner from "../../components/Spinner/Spinner.component";
import PostCard from "../../components/post-card/post-card.component";
import CommentForm from "../../components/comment-form/comment-form.component";
import CommentCard from "../../components/comment-card/comment-card.component";
import { getPost } from "../../redux/post/post-actions";
import { useParams } from "react-router-dom";

const Post = ({ getPost, post: { post, loading } }) => {
  const { id } = useParams();

  useEffect(() => {
    getPost(id);
  }, [getPost, id, post]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Center sx={{ width: "100%" }}>
      <Stack sx={{ width: "50%" }}>
        <PostCard post={post} />
        <CommentForm postId={post._id} />
        {post.comments.map((comment) => (
          <CommentCard key={comment._id} comment={comment} postId={post._id} />
        ))}
      </Stack>
    </Center>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
