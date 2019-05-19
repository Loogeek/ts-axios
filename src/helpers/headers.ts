import { isPlainObject, deepMerge } from './util';
import { Method } from '../types';

function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (isPlainObject(headers)) {
    Object.keys(headers).forEach(key => {
      if (
        key !== normalizeName &&
        key.toLocaleLowerCase() === normalizeName.toLocaleLowerCase()
      ) {
        headers[normalizeName] = headers[key];
        delete headers[key];
      }
    });
  }
}

export function parseRequestHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type');

  if (isPlainObject(data)) {
    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8';
    }
  }
  return headers;
}

export function parseReponentHeaders(headers: string): Object {
  const resHeaders = Object.create(null);

  if (!headers) return resHeaders;

  headers.split('\r\n').forEach(header => {
    let [key, val] = header.split(':');
    if (!key) return;

    if (val) {
      val = val.trim();
    }

    resHeaders[key] = val;
  });
  return resHeaders;
}

// 将headers中default的一些参数压到一层
export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) return headers;

  headers = deepMerge(headers.common || {}, headers[method] || {}, headers);

  const methodsToDelete = [
    'delete',
    'get',
    'head',
    'options',
    'post',
    'put',
    'path',
    'common'
  ];

  methodsToDelete.forEach(method => delete headers[method]);
}
