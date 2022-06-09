import axios from "axios";


const url = import.meta.env.VITE_BASEURL;
const http = axios.create({
  baseURL: url,

  headers: { "X-Requested-With": "XMLHttpRequest" },
});
http.interceptors.request.use((config) => {
  console.log("request has been sent");
  return config;
});

http.interceptors.response.use((response) => {
  console.log("request has been sent");
  return response;
});
export default http;
