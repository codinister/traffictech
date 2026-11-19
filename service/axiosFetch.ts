import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const axiosFetch = ({ ...options }) =>
  api(options)
    .then((data) => data)
    .catch((err) => err);

export default axiosFetch;
