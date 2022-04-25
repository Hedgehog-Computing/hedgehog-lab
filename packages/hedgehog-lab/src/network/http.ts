import axios from "axios";

axios.defaults.timeout = 100000;
axios.defaults.baseURL = "https://api.preview.hlab.app/";

export const http = axios;
