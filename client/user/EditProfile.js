import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Icon,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { read, update } from "./api-user";
import auth from "../auth/auth-helper";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import { useNavigate } from "react-router";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
  },
  error: {
    verticalAlign: "middle",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: "auto",
  },
  input: {
    display: "none",
  },
  filename: {
    marginLeft: "10px",
  },
}));

const EditProfile = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    about: "",
    photo: "",
    email: "",
    password: "",
    redirectToProfile: false,
    error: "",
    id: "",
  });
  const jwt = auth.isAuthenticated();
  const token = jwt.token;
  const userId = jwt.user._id;

  useEffect(() => {
    const fetchUser = async (signal) => {
      const data = await read(userId, token, signal);
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          email: data.email,
          about: data.about,
        });
      }
    };
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetchUser(signal);
    return () => abortController.abort();
  }, [userId]);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = async () => {
    const userData = new FormData();
    values.name && userData.append("name", values.name);
    values.email && userData.append("email", values.email);
    values.passoword && userData.append("passoword", values.passoword);
    values.about && userData.append("about", values.about);
    values.photo && userData.append("photo", values.photo);

    const data = await update(userId, token, userData);
    if (data.error) {
      setValues({ ...values, error: data.error });
    } else {
      navigate(`/user/${userId}`);
    }
  };

  const photoUrl = userId
    ? `/api/users/photo/${userId}?${new Date().getTime()}`
    : "/api/users/defaultphoto";

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant='h6' className={classes.title}>
          Edit Profile
        </Typography>
        <Avatar src={photoUrl} className={classes.bigAvatar} />
        <br />
        <input
          accept='image/*'
          type='file'
          onChange={handleChange("photo")}
          style={{ display: "none" }}
          id='icon-button-file'
        />
        <label htmlFor='icon-button-file'>
          <Button variant='contained' color='default' component='span'>
            Upload <FileUpload />
          </Button>
        </label>
        <span className={classes.filename}>
          {values.photo ? values.photo.name : ""}
        </span>
        <br />
        <TextField
          id='name'
          label='Name'
          className={classes.textField}
          value={values.name}
          onChange={handleChange("name")}
          margin='normal'
        />
        <br />
        <TextField
          id='multiline-flexible'
          label='About'
          multiline
          minRows='2'
          value={values.about}
          onChange={handleChange("about")}
          className={classes.textField}
          margin='normal'
        />
        <TextField
          id='email'
          type='email'
          label='Email'
          className={classes.textField}
          value={values.email}
          onChange={handleChange("email")}
          margin='normal'
        />
        <br />
        <TextField
          id='password'
          type='password'
          label='Password'
          className={classes.textField}
          value={values.password}
          onChange={handleChange("password")}
          margin='normal'
        />
        <br />
        {values.error && (
          <Typography component='p' color='error'>
            <Icon color='error' className={classes.error}>
              error
            </Icon>
            {values.error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          color='primary'
          variant='contained'
          onClick={clickSubmit}
          className={classes.submit}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

export default EditProfile;
