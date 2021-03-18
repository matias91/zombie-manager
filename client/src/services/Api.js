// @Vendors
import apisauce from 'apisauce';

// API's
import zombieApi from './Zombie';

// @Config

const create = () => {
  const api = apisauce.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
      'Content-type': 'application/json'
    },
    timeout: 100000
  });

  return Object.assign(
    {},
    zombieApi.create(api)
  );
};

const api = { create };

export default api;
