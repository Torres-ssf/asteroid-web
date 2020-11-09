import axios from 'axios';

const asteroidApiParams = {
  detailed: true,
  api_key: process.env.REACT_APP_API_KEY,
};

const appApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const asteroidApi = axios.create({
  baseURL: 'https://api.nasa.gov/neo/rest/v1/feed/today',
  params: asteroidApiParams,
});

export { appApi, asteroidApi };
