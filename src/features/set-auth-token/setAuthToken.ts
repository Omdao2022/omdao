import { httpInstance } from "../../shared/api";

// store our JWT in LS and set axios headers if we do have a token

const setAuthToken = (token: string) => {
  if (token) {
    httpInstance.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
  } else {
    delete httpInstance.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
};

export default setAuthToken;