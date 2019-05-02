import { AxioRequestConfig } from './types/index';

function xhr(config: AxioRequestConfig): void {
  const { url, method = 'GET', data = null } = config;
  const request = new XMLHttpRequest();

  request.open(method.toUpperCase(), url, true);

  request.send(data);
}

export default xhr;
