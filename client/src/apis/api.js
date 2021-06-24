import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: [
    (data) => {
      return JSON.stringify(data);
    },
  ],
});

//Managing USERS
const loginOrRegisterUser = (payload) =>
  api.post("/register_login", {
    email: payload.email,
    password: payload.password,
  });

const logOutUser = () => api.get("/logout");
const addNewPost = (payload) => api.post("/post", payload);
const getAllPosts = () => api.get("/posts");

const feisbuciucAPI = {
  loginOrRegisterUser,
  logOutUser,
  addNewPost,
  getAllPosts,
};

export default feisbuciucAPI;
