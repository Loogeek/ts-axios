import {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise
} from '../types/index';
import { parseReponentHeaders } from '../helpers/headers';
import { createError } from './error';

function xhr(config: AxiosRequestConfig): AxiosPromise {
  const {
    url,
    method = 'GET',
    data = null,
    headers,
    responseType,
    timeout,
    cancelToken
  } = config;
  return new Promise((resolve, rejects) => {
    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType;
    }

    if (timeout) {
      request.timeout = timeout;
    }

    request.open(method.toUpperCase(), url!, true);

    Object.keys(headers).forEach(key => {
      if (data === null && key.toLocaleLowerCase() === 'content-type') {
        delete headers[key];
      } else {
        request.setRequestHeader(key, headers[key]);
      }
    });

    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort();
        rejects(reason);
      });
    }

    request.send(data);

    request.onreadystatechange = function handleStateChange() {
      if (request.readyState !== 4) return;

      if (request.status === 0) return;

      const responseHeaders = parseReponentHeaders(
        request.getAllResponseHeaders()
      );
      let responseData =
        responseType && responseType !== 'text'
          ? request.response
          : request.responseText;

      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };

      if (response.status >= 200 && response.status < 300) {
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
  });
}

export default xhr;
