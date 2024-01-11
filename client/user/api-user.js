const create = async (user) => {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const list = async (signal) => {
  try {
    let response = await fetch("/api/users/", {
      method: "GET",
      signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const read = async (userId, token, signal) => {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const update = async (userId, token, user) => {
  try {
    let response = await fetch("/api/users/" + userId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: user,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const remove = async (userId, token) => {
  try {
    let response = await fetch("/api/users/" + userId, {
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

const follow = async (userId, token, followId) => {
  try {
    let response = await fetch("/api/users/follow/", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ userId, followId: followId }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const unfollow = async (userId, token, unfollowId) => {
  try {
    let response = await fetch("/api/users/unfollow/", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ userId, unfollowId: unfollowId }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const findPeople = async (userId, token, signal) => {
  try {
    let response = await fetch("/api/users/findpeople/" + userId, {
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

export { create, list, read, update, remove, follow, unfollow, findPeople };
