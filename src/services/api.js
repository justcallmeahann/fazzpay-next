import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_SERVER,
  headers: {
    // Authorization: `Bearer ${cookies["ngbackend.token"]}`,
  },
});

export default api;
