import { isPlainObject, isDate } from './util';

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}

export function parseURL(url: string, params: any): string {
  if (!params) return url;

  const paths: string[] = [];
  if (isPlainObject(params)) {
    Object.keys(params).map(key => {
      const val = params[key];

      if (val === null || val === undefined) return;

      let values: string[] = [];
      if (Array.isArray(val)) {
        key += '[]';
        values = val;
      } else {
        values = [val];
      }

      values.forEach(val => {
        if (isDate(val)) {
          val = val.toISOString();
        } else if (isPlainObject(val)) {
          val = JSON.stringify(val);
        }

        paths.push(`${encode(key)}=${encode(val)}`);
      });
    });
  }

  let serializedParams = paths.join('&');

  if (serializedParams) {
    const markIndex = url.indexOf('#');
    if (markIndex !== -1) {
      url = url.slice(0, markIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}
