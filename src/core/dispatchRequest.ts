import {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise
} from '../types/index';
import xhr from './xhr';
import { parseURL } from '../helpers/url';
import { flattenHeaders } from '../helpers/headers';
import { transformData } from './transformData';

export default function dispatchRequest(
  config: AxiosRequestConfig
): AxiosPromise {
  throwIfCancellationRequested(config); // 发送请求前检查一下配置的 cancelToken 是否已经使用过了，如果已经被用过则不发送请求，直接抛异常。
  processConfig(config);
  return xhr(config).then(res => transformResponseData(res));
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config);
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );
  config.headers = flattenHeaders(config.headers, config.method!);
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config;
  return parseURL(url!, params);
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformData(res.data, res.headers, res.config.transformResponse);
  return res;
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}
