import Axios from "axios";
// create an new axios http instance
const http = Axios.create({
  baseURL: <string>import.meta.env.VITE_BASEURL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

http.defaults.headers.common.accept = "application/json";

// before a request is made start  anything
http.interceptors.request.use((config) => {
  return config;
});

// before a response is returned do anything
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.status === 401 && error.message === "Token has Expired") {
      sessionStorage.removeItem(<string>import.meta.env.VITE_AUTHTOKEN);
      return ((window.location as unknown as string) = "/");
    }
    return error;
  }
);

const base_url = http.defaults.baseURL;

export { http, base_url };
