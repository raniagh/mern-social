const create = async (userId, token, post) => {
  try {
    let response = await fetch("/api/posts/new/" + userId, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: post,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const listNewsFeed = async (userId, token, signal) => {
  try {
    let response = await fetch("/api/posts/feed/" + userId, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const listByUser = async (userId, token) => {
  try {
    let response = await fetch("/api/posts/by/" + userId, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const remove = async (postId, token) => {
  try {
    let response = await fetch("/api/posts/" + postId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const like = async (userId, postId, token) => {
  try {
    let response = await fetch("/api/posts/like", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ userId: userId, postId: postId }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const unlike = async (userId, postId, token) => {
  try {
    let response = await fetch("/api/posts/unlike", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ userId: userId, postId: postId }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const comment = async (userId, postId, comment, token) => {
  try {
    let response = await fetch("/api/posts/comment", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        userId,
        postId,
        comment,
      }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const uncomment = async (postId, comment, token) => {
  try {
    let response = await fetch("/api/posts/uncomment", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ comment, postId }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export {
  create,
  listNewsFeed,
  listByUser,
  remove,
  like,
  unlike,
  comment,
  uncomment,
};
