import { isPlainObject } from './util';

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
