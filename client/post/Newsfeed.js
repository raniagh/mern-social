import { Card, Divider, Typography, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PostList from "./PostList";
import NewPost from "./NewPost";
import { listNewsFeed } from "./api-post";
import auth from "../auth/auth-helper";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "auto",
    paddingTop: 0,
    paddingBottom: theme.spacing(3),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
    fontSize: "1em",
  },
  media: {
    minHeight: 330,
  },
}));

const Newsfeed = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const jwt = auth.isAuthenticated();
  const token = jwt?.token;
  const userId = jwt?.user?._id;

  useEffect(() => {
    const fetchPosts = async (signal) => {
      if (!token) {
        navigate("/signin");
      }
      const data = await listNewsFeed(userId, token, signal);
      if (data && data.error) {
        console.log(data.error);
      } else {
        setPosts(data);
      }
    };
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetchPosts(signal);
    // Cleanup function to abort the ongoing asynchronous operation
    return () => abortController.abort();
  }, [userId]);

  const addPost = (post) => {
    const updatedPosts = [...posts];
    updatedPosts.unshift(post);
    setPosts(updatedPosts);
  };

  const removePost = (post) => {
    const updatedPosts = [...posts];
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  return (
    <Card className={classes.card}>
      <Typography type='title' className={classes.title}>
        Newsfeed
      </Typography>
      <Divider />
      <NewPost addUpdate={addPost} />
      <Divider />
      <PostList removeUpdate={removePost} posts={posts} />
    </Card>
  );
};

export default Newsfeed;
