import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

API.interceptors.request.use(cfg => {
  const id      = localStorage.getItem('clientId');
  const access  = localStorage.getItem('accessToken');
  const refresh = localStorage.getItem('refreshToken');

  if (id)      cfg.headers['x-client-id'] = id;
  if (access)  cfg.headers.authorization  = access;   
  if (refresh) cfg.headers['x-rtoken-id'] = refresh;  

  return cfg;
});

export default API;
