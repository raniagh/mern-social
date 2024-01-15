import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Icon,
  TextField,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import auth from "../auth/auth-helper";
import { comment, uncomment } from "./api-post";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  smallAvatar: {
    width: 25,
    height: 25,
  },
  commentField: {
    width: "96%",
  },
  commentText: {
    backgroundColor: "white",
    padding: theme.spacing(1),
    margin: `2px ${theme.spacing(2)}px 2px 2px`,
  },
  commentDate: {
    display: "block",
    color: "gray",
    fontSize: "0.8em",
  },
  commentDelete: {
    fontSize: "1.6em",
    verticalAlign: "middle",
    cursor: "pointer",
  },
}));

const Comments = ({ postId, comments, updateComments }) => {
  const [text, setText] = useState("");
  const classes = useStyles();
  const jwt = auth.isAuthenticated();
  const userId = jwt?.user?._id;

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const addComment = async (event) => {
    if (event.keyCode == 13 && event.target.value) {
      event.preventDefault();
      const data = await comment(userId, postId, { text: text }, jwt?.token);
      if (data.error) {
        console.log(data.error);
      } else {
        setText("");
        updateComments(data.comments);
      }
    }
  };

  const deleteComment = (comment) => (event) => {
    const data = uncomment(postId, comment, jwt?.token);
    if (data.error) {
      console.log(data.error);
    } else {
      updateComments(data.comments);
    }
  };

  const commentBody = (item) => {
    return (
      <p className={classes.commentText}>
        <Link to={"/user/" + item?.postedBy?._id}>{item?.postedBy?.name} </Link>
        <br />
        {item.text}
        <span className={classes.commentDate}>
          {new Date(item.created).toDateString()} |
          {userId === item.postedBy._id && (
            <Icon
              onClick={deleteComment(item)}
              className={classes.commentDelete}
            >
              delete
            </Icon>
          )}
        </span>
      </p>
    );
  };

  return (
    <div>
      <CardHeader
        avatar={
          <Avatar
            className={classes.smallAvatar}
            src={"/api/users/photo/" + userId}
          />
        }
        title={
          <TextField
            onKeyDown={addComment}
            multiline
            value={text}
            onChange={handleChange}
            placeholder='Write something ...'
            className={classes.commentField}
            margin='normal'
          />
        }
        className={classes.cardHeader}
      />
      {comments?.map((item, i) => {
        return (
          <CardHeader
            avatar={
              <Avatar
                className={classes.smallAvatar}
                src={"/api/users/photo/" + item?.postedBy?._id}
              />
            }
            title={commentBody(item)}
            className={classes.cardHeader}
            key={i}
          />
        );
      })}
    </div>
  );
};

export default Comments;
