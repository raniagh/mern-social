import { Button } from "@material-ui/core";
import React from "react";
import { follow, unfollow } from "./api-user";

const FollowProfileButton = ({ following, onButtonClick }) => {
  const unfollowClick = () => {
    onButtonClick(unfollow);
  };
  const followClick = () => {
    onButtonClick(follow);
  };

  return (
    <div>
      {following ? (
        <Button variant='contained' color='secondary' onClick={unfollowClick}>
          Unfollow
        </Button>
      ) : (
        <Button variant='contained' color='primary' onClick={followClick}>
          Follow
        </Button>
      )}
    </div>
  );
};

export default FollowProfileButton;
