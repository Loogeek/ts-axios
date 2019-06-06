import { AxiosRequestConfig } from './types';
import { parseRequestHeaders } from './helpers/headers';
import { transformRequest, transformResponse } from './helpers/data';

const defaults: AxiosRequestConfig = {
  method: 'GET',

  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },

  transformRequest: [
    function(data: any, headers: any): any {
      parseRequestHeaders(headers, data);
      return transformRequest(data);
    }
  ],

  transformResponse: [
    function(data: any): any {
      return transformResponse(data);
    }
  ],

  validateStatus(status: number): boolean {
    return status >= 200 && status < 300;
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
