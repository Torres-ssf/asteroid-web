import axios from 'axios';

const asteroidApiParams = {
  detailed: true,
  api_key: process.env.REACT_APP_API_KEY,
};

const appApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const url = 'https://api.nasa.gov/neo/rest/v1';

const asteroidApiId = axios.create({
  baseURL: url.concat('/neo'),
  params: asteroidApiParams,
});

const asteroiApiWeekly = axios.create({
  baseURL: url.concat('/feed'),
  params: asteroidApiParams,
});

export { appApi, asteroidApiId, asteroiApiWeekly };
