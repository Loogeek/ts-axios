import {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise
} from '../types/index';
import xhr from './xhr';
import { parseURL } from '../helpers/url';
import { transformRequest, transformResponse } from '../helpers/data';
import { parseRequestHeaders, flattenHeaders } from '../helpers/headers';

export default function dispatchRequest(
  config: AxiosRequestConfig
): AxiosPromise {
  processConfig(config);
  return xhr(config).then(res => transformResponseData(res));
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config);
  config.headers = transformHeaders(config);
  config.data = transformRequestData(config);
  config.headers = flattenHeaders(config.headers, config.method!);
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config;
  return parseURL(url!, params);
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config;
  return parseRequestHeaders(headers, data);
}

function transformRequestData(config: AxiosRequestConfig): any {
  const { data } = config;
  return transformRequest(data);
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data);
  return res;
}