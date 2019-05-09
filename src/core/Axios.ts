import { AxiosRequestConfig, AxiosPromise, Method } from '../types';
import dispatchRequest from './dispatchRequest';

export default class Axios {
  request(config: AxiosRequestConfig): AxiosPromise {
    return dispatchRequest(config);
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethod({ url, method: 'GET', config });
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethod({ url, method: 'DELETE', config });
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethod({ url, method: 'HEAD', config });
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethod({ url, method: 'OPTIONS', config });
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethod({ url, method: 'POST', config, data });
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethod({ url, method: 'PUT', config, data });
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethod({ url, method: 'PATCH', config, data });
  }

  _requestMethod({
    url,
    method,
    config,
    data
  }: {
    url: string;
    method?: Method;
    config?: AxiosRequestConfig;
    data?: any;
  }) {
    return this.request(
      Object.assign(config || {}, {
        url,
        method,
        data
      })
    );
  }
}
