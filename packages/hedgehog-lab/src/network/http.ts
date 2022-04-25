import axios from "axios";

axios.defaults.timeout = 100000;
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? "http://localhost:9000/" : 'https://api.preview.hlab.app/';

export const http = axios;
