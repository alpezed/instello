import axios from "axios";

import { isAuth } from "./auth";

const AUTH_TOKEN = `Bearer ${isAuth()}`;

// Set config defaults when creating the instance
const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
});

instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;

export default instance;
