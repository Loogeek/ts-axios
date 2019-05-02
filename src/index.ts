import { AxioRequestConfig } from './types/index';
import xhr from './xhr';

function axios(config: AxioRequestConfig): void {
  xhr(config);
}

export default axios;
