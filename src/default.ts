import { AxiosRequestConfig } from './types';

const defaults: AxiosRequestConfig = {
  method: 'GET',

  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
};

const methodsNoData = ['get', 'delete', 'head', 'options'];

methodsNoData.forEach(method => {
  defaults.headers[method] = {};
});

const methodsWithData = ['post', 'put', 'patch'];

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
});

export default defaults;
