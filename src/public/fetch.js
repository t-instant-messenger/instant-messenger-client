import axios from "axios";

export const login = (username, password) => async () => {
  try {
    const { data } = await axios.post("/api/users/login", {
      username,
      password,
    });
    return data;
  } catch (error) {
    console.log("Something went wrong with login");
  }
};

export const signup = (username, password, language) => async () => {
  try {
    const { data } = await axios.post(`/api/users/register`, {
      username,
      password,
      language,
    });

    return data;
  } catch (error) {
    console.log("Something went wrong with signup");
  }
};

export const getRoom = () => async () => {
  try {
    const { data } = await axios.get("/api/rooms/");
    return data;
  } catch (error) {
    console.log("roomName error");
  }
};

export const createRoom = (name, roomKey, userId) => async () => {
  try {
    const { data } = await axios.post(`/api/rooms/${userId}`);
    return;
  } catch (error) {
    console.log("Couldn't create room");
  }
};
