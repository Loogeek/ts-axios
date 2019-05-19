import {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise,
  Method,
  ResolvedFn,
  RejectedFn
} from '../types';
import InterceptorManager from './interceptorManager';
import dispatchRequest from './dispatchRequest';
import mergeConfig from './mergeConfig';

interface PromiseChain {
  resolved: ResolvedFn | ((config: AxiosRequestConfig) => AxiosPromise);
  rejected?: RejectedFn;
}

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>;
  response: InterceptorManager<AxiosResponse>;
}

export default class Axios {
  defaults: AxiosRequestConfig;
  interceptors: Interceptors;

  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig;
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    };
  }

  request<T = any>(url: any, config?: any): AxiosPromise<T> {
    if (typeof url === 'string') {
      if (!config) {
        config = {};
      }
      config.url = url;
    } else {
      config = url;
    }

    config = mergeConfig(this.defaults, config);

    const chain: PromiseChain[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ];

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor); // 请求拦截：先添加后处理
    });

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor); // 响应拦截：先添加先处理
    });

    let promise = Promise.resolve(config);

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!;
      promise = promise.then(resolved, rejected);
    }

    return promise;
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
