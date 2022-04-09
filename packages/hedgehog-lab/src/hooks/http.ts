import axios from "axios";

axios.defaults.timeout = 100000;
axios.defaults.baseURL = "http://localhost:9000/";

export const http = axios;
