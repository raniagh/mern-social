import React, { useEffect, useState } from "react";
import { findPeople, follow } from "./api-user";
import auth from "../auth/auth-helper";
import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Snackbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ViewIcon from "@material-ui/icons/Visibility";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: 0,
  }),
  title: {
    margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    fontSize: "1em",
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  follow: {
    right: theme.spacing(2),
  },
  snack: {
    color: theme.palette.protectedTitle,
  },
  viewButton: {
    verticalAlign: "middle",
  },
}));

const FindPeople = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [followMessage, setFollowMessage] = useState("");
  const jwt = auth.isAuthenticated();
  const signedUser = jwt?.user?._id;
  const token = jwt?.token;

  useEffect(() => {
    // Define an asynchronous function to fetch the user list
    const fetchUserList = async (signal) => {
      const data = await findPeople(signedUser, token, signal);
      if (data && data.error) {
        console.error(data.error);
      } else {
        setUsers(data);
      }
    };
    // Create an AbortController and get its signal
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetchUserList(signal);

    // Cleanup function to abort the ongoing asynchronous operation
    return () => abortController.abort();
  }, []);

  const clickFollow = async (user, index) => {
    const data = await follow(signedUser, token, user?._id);
    if (data.error) {
      console.log(data.error);
    } else {
      const toFollow = users;
      toFollow.splice(index, 1);
      setUsers(toFollow);
      setOpen(true);
      setFollowMessage(`Following ${user?.name}!`);
    }
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type='title' className={classes.title}>
          Who to follow
        </Typography>
        <List>
          {users.map((item, i) => {
            return (
              <span key={i}>
                <ListItem>
                  <ListItemAvatar className={classes.avatar}>
                    <Avatar src={"/api/users/photo/" + item._id} />
                  </ListItemAvatar>
                  <ListItemText primary={item.name} />
                  <ListItemSecondaryAction className={classes.follow}>
                    <Link to={"/user/" + item._id}>
                      <IconButton
                        variant='contained'
                        color='secondary'
                        className={classes.viewButton}
                      >
                        <ViewIcon />
                      </IconButton>
                    </Link>
                    <Button
                      aria-label='Follow'
                      variant='contained'
                      color='primary'
                      onClick={() => {
                        clickFollow(item, i);
                      }}
                    >
                      Follow
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </span>
            );
          })}
        </List>
      </Paper>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={open}
        onClose={handleRequestClose}
        autoHideDuration={6000}
        message={<span className={classes.snack}>{followMessage}</span>}
      />
    </div>
  );
};

export default FindPeople;
