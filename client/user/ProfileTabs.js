import React, { useState } from "react";
import { AppBar, Tab, Tabs, Typography } from "@material-ui/core";
import FollowGrid from "./FollowGrid";
import PostList from "../post/PostList";

const ProfileTabs = ({ user, posts, removePostUpdate }) => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, value) => {
    setTab(value);
  };
  return (
    <div>
      <AppBar position='static' color='default'>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
        >
          <Tab label='Posts' />
          <Tab label='Following' />
          <Tab label='Followers' />
        </Tabs>
      </AppBar>
      {tab === 0 && (
        <TabContainer>
          <PostList removeUpdate={removePostUpdate} posts={posts} />
        </TabContainer>
      )}
      {tab === 1 && (
        <TabContainer>
          <FollowGrid peoples={user?.following} />
        </TabContainer>
      )}
      {tab === 2 && (
        <TabContainer>
          <FollowGrid peoples={user?.followers} />
        </TabContainer>
      )}
    </div>
  );
};

const TabContainer = ({ children }) => {
  return (
    <Typography component='div' style={{ padding: 8 * 2 }}>
      {children}
    </Typography>
  );
};

export default ProfileTabs;
