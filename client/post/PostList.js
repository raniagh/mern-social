import React from "react";
import Post from "./Post";

const PostList = ({ posts, removeUpdate }) => {
  return (
    <div style={{ marginTop: "24px" }}>
      {posts.map((item, i) => {
        return <Post post={item} key={i} onRemove={removeUpdate} />;
      })}
    </div>
  );
};

export default PostList;
