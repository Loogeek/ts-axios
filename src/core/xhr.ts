import {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise
} from '../types/index';
import { parseReponentHeaders } from '../helpers/headers';
import { createError } from './error';
import { isFormData } from '../helpers/util';

/**
 * 流程
 * 1. 创建一个 request 实例。
 * 2. 执行 request.open 方法初始化。
 * 3. 执行 configureRequest 配置 request 对象。
 * 4. 执行 addEvents 给 request 添加事件处理函数。
 * 5. 执行 processHeaders 处理请求 headers。
 * 6. 执行 processCancel 处理请求取消逻辑。
 * 7. 执行 request.send 方法发送请求。
 */

function xhr(config: AxiosRequestConfig): AxiosPromise {
  const {
    url,
    method = 'GET',
    data = null,
    headers,
    responseType,
    timeout,
    cancelToken,
    withCredentials,
    onDownloadProgress,
    onUploadProgress,
    auth,
    validateStatus
  } = config;
  return new Promise((resolve, rejects) => {
    const request = new XMLHttpRequest();
    request.open(method.toUpperCase(), url!, true);

    configureRequest();

    addEvents();

    processHeaders();

    processCancel();

    request.send(data);

    function configureRequest(): void {
      if (responseType) {
        request.responseType = responseType;
      }

      if (timeout) {
        request.timeout = timeout;
      }

      if (withCredentials) {
        request.withCredentials = true;
      }
    }

    function addEvents(): void {
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress;
      }

      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress;
      }

      request.onreadystatechange = function handleStateChange() {
        if (request.readyState !== 4) return;

        if (request.status === 0) return;

        const responseHeaders = parseReponentHeaders(
          request.getAllResponseHeaders()
        );
        const responseData =
          responseType && responseType !== 'text'
            ? request.response
            : request.responseText;

        const response: AxiosResponse = {
          config,
          request,
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders
        };

        handleResponse(response);
      };

      request.onerror = function handleError() {
        rejects(createError('Network Error', config, null, request));
      };

      request.ontimeout = function handleTimeout() {
        rejects(
          createError(
            `Timeout of ${timeout}ms exceeded`,
            config,
            'ECONNABORTED',
            request
          )
        );
      };
    }

    function processHeaders(): void {
      /**
       * FormData类型让游览器自动根据数据类型设置Content-type
       * 如通过FormData上传文件时，游览器会把请求中Content-type设置为multipart/form-data
       */
      if (isFormData(data)) {
        delete headers['Content-type'];
      }

      if (auth) {
        // Basic加密串 username:password base64
        const val = `${auth.username}:${auth.password}`;
        headers['Authorization'] = `Basic ${btoa(val)}`;
      }

      Object.keys(headers).forEach(key => {
        if (data === null && key.toLocaleLowerCase() === 'content-type') {
          delete headers[key];
        } else {
          request.setRequestHeader(key, headers[key]);
        }
      });
    }

    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort();
          rejects(reason);
        });
      }
    }

    function handleResponse(response: AxiosResponse) {
      if (validateStatus && validateStatus(response.status)) {
        resolve(response);
      } else {
        rejects(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        );
      }
    }
  });
}

export default xhr;
