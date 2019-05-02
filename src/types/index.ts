export type Method = 'get' | 'GET'
| 'delete' | 'Delete'
| 'head' | 'HEAD'
| 'options' | 'OPTIONS'
| 'post' | 'POST'
| 'put' | 'PUT'
| 'patch' | 'PATCH';

export interface AxioRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
}
