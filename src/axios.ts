import Axios from './core/Axios';
import { AxiosStatic, AxiosRequestConfig } from './types';
import { extend } from './helpers/util';
import defaults from './default';
import mergeConfig from './core/mergeConfig';
import CancelToken from './cancel/CancelToken';
import Cancel, { isCancel } from './cancel/Cancel';

function createInstance(initConfig: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(initConfig);
  const instance = Axios.prototype.request.bind(context);

  extend(instance, context);

  return instance as AxiosStatic;
}

const axios = createInstance(defaults);

axios.create = function(config) {
  return createInstance(mergeConfig(defaults, config));
};

axios.CancelToken = CancelToken;
axios.Cancel = Cancel;
axios.isCancel = isCancel;

export default axios;
