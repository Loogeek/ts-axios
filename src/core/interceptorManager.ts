import { ResolvedFn, RejectedFn } from '../types';

interface interceptor<T> {
  resolved: ResolvedFn<T>;
  rejected?: RejectedFn;
}

export default class InterceptorManager<T> {
  private interceptors: Array<interceptor<T> | null>;

  constructor() {
    this.interceptors = [];
  }

  use(resolved: ResolvedFn, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    });

    return this.interceptors.length - 1;
  }

  forEach(fn: (interceptor: interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor);
      }
    });
  }

  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null;
    }
  }
}
