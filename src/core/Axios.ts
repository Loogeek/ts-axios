import { AxiosRequestConfig, AxiosPromise, Method } from '../types';
import dispatchRequest from './dispatchRequest';

export default class Axios {
  request<T = any>(url: any, config?: any): AxiosPromise<T> {
    if (typeof url === 'string') {
      if (!config) {
        config = {};
      }
      config.url = url;
    } else {
      config = url;
    }

    return dispatchRequest(config);
  }

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethod({ url, method: 'GET', config });
  }

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethod({ url, method: 'DELETE', config });
  }

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethod({ url, method: 'HEAD', config });
  }

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethod({ url, method: 'OPTIONS', config });
  }

  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this._requestMethod({ url, method: 'POST', config, data });
  }

  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this._requestMethod({ url, method: 'PUT', config, data });
  }

  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
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
