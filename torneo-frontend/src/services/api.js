import axios from "axios";

console.log("API CARGADA");

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export default api;