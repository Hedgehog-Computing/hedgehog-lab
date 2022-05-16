import axios from "axios";

const hostname = window.location.hostname;

let url
switch (hostname) {
    case "preview.hlab.app":
        url = "https://api.preview.hlab.app";
        break;
    case "hlab.app":
        axios.defaults.baseURL = "https://api.hlab.app";
        break;
    default:
        axios.defaults.baseURL = "http://localhost:9000";
}

axios.defaults.timeout = 100000;
axios.defaults.baseURL = url;

export const http = axios;
