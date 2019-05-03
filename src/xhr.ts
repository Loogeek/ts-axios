import { AxiosRequestConfig, AxioResponse, AxiosPromise } from './types/index';
import { parseReponentHeaders } from './helpers/headers';

function xhr(config: AxiosRequestConfig): AxiosPromise {
  const { url, method = 'GET', data = null, headers, responseType } = config;
  return new Promise(resolve => {
    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType;
    }

    request.open(method.toUpperCase(), url, true);

    Object.keys(headers).forEach(key => {
      if (data === null && key.toLocaleLowerCase() === 'content-type') {
        delete headers[key];
      } else {
        request.setRequestHeader(key, headers[key]);
      }
    });

    request.send(data);

    request.onreadystatechange = function handleReqStateChange() {
      if (request.readyState !== 4) return;

      const responseHeaders = parseReponentHeaders(
        request.getAllResponseHeaders()
      );
      let responseData =
        responseType && responseType !== 'text'
          ? request.response
          : request.responseText;

      const response: AxioResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      resolve(response);
    };
  });
}

export default xhr;
