import axios from 'axios';
import history from '../history';

// axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      history.push(`/login?next=${history.location.pathname}`);
    }
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(request => {
  request.headers.Authorization = `Bearer ${window.localStorage.getItem(
    'token'
  )}`;
  return request;
});
