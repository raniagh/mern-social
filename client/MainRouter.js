import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users";
import Signup from "./user/Signup";
import Signin from "./auth/Signin";
import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile";
import PrivateRoute from "./auth/PrivateRoute";
import Menu from "./core/Menu";
import FindPeople from "./user/FindPeople";
import Newsfeed from "./post/Newsfeed";

const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/users' element={<Users />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/user/:userId' element={<Profile />} />
        <Route path='/find' element={<FindPeople />} />
        <Route path='/news' element={<Newsfeed />} />
        <Route
          path='/user/edit/:userId'
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default MainRouter;
