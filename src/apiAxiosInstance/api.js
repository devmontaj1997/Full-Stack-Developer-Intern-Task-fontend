import axios from "axios";

const API = axios.create({
  baseURL: "https://fullstackdeveloperinterntask-backend.onrender.com/api/v1/exercise",
  timeout: 20000,
  withCredentials: true,
});

export default API;
