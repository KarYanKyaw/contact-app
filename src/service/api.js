import axios from "axios";
import { API_ENDPOINT } from "../lib/contact";

const storedAuth = localStorage.getItem("auth");
const authHeader = storedAuth ? { Authorization: `Bearer ${storedAuth}` } : {};

export const api = axios.create({
  baseURL: API_ENDPOINT,
  headers: authHeader,
});
