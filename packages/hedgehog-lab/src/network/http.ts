import axios from "axios";

const hostname = window.location.hostname;

let url
switch (hostname) {
    case "preview.hlab.app":
        url = "https://api.preview.hlab.app";
        break;
    case "hlab.app":
        url = "https://api.hlab.app";
        break;
    default:
        url = "https://api.hlab.app";
}

axios.defaults.timeout = 100000;
axios.defaults.baseURL = url;

export const http = axios;
