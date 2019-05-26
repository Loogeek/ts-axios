export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH';

export interface AxiosRequestConfig {
  url?: string;
  method?: Method;
  data?: any;
  params?: any;
  headers?: any;
  responseType?: XMLHttpRequestResponseType;
  timeout?: number;
  transformRequest?: AxiosTransformer | AxiosTransformer[];
  transformResponse?: AxiosTransformer | AxiosTransformer[];
  cancelToken?: CancelToken;

  [propName: string]: any;
}

export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request: any;
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  config: AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: AxiosResponse;
  isAxiosError: boolean;
}

export interface Axios {
  defaults: AxiosRequestConfig;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };

  request(config: AxiosRequestConfig): AxiosPromise;

  get(url: string, config?: AxiosRequestConfig): AxiosPromise;

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise;

  head(url: string, config?: AxiosRequestConfig): AxiosPromise;

  options(url: string, config?: AxiosRequestConfig): AxiosPromise;

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>;

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance;

  CancelToken: CancelTokenStatic;
  Cancel: CancelStatic;
  isCancel: (value: any) => boolean;
}

export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number;

  eject(id: number): void;
}

export interface ResolvedFn<T = any> {
  (val: T): T | Promise<T>;
}

export interface RejectedFn {
  (error: any): any;
}

export interface AxiosTransformer {
  (data: any, headers?: any): any;
}

// Cancel
export interface CancelToken {
  promise: Promise<Cancel>;
  reason?: Cancel;

  throwIfRequested(): void;
}

export interface Canceler {
  (message?: string): void;
}

export interface CancelExecutor {
  (cancel: Canceler): void;
}

export interface CancelTokenSource {
  token: CancelToken;
  cancel: Canceler;
}

export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken;

  source(): CancelTokenSource;
}

export interface Cancel {
  message?: string;
}

export interface CancelStatic {
  new (message?: string): Cancel;
}
