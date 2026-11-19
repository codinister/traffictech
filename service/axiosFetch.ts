import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
});

const axiosFetch = ({ ...options }) =>
  api(options)
    .then((data) => data)
    .catch((err) => err);

export default axiosFetch;
