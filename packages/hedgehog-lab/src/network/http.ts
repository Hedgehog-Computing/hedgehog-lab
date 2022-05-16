import axios from "axios";

axios.defaults.timeout = 100000;
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? "https://api.preview.hlab.app/" : 'https://api.hlab.app/';

export const http = axios;
