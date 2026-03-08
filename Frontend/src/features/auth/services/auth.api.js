import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export async function userLogin({ username, password, email }) {
  const response = await api.post("/login", {
    username,
    email,
    password,
  });

  return response.data;
}

export async function userRegister({ email, username, password }) {
  const response = await api.post("/register", {
    username,
    email,
    password,
  });

  return response.data;
}

export async function getMe() {
  const response = await api.get("/get-me");

  return response.data;
}

export async function userLogout() {
  const response = await api.post("/logout");

  return response.data;
}
