import axios from "axios";

const api = axios.create({
  port: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export async function userLogin(username, password) {
  const response = await api.post("/login", {
    username,
    password,
  });

  return response.data;
}

export async function userRegister(email, username, password) {
  const response = await api.post("/register", {
    username,
    email,
    password,
  });

  return response.data;
}

export async function getMe() {
    const response = await api.post("/get-me");

    return response.data;
}