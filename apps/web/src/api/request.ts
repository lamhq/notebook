/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unnecessary-type-parameters */

import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';

export type RequestFn = <Result = any, Arg = any>(arg: Arg) => Promise<Result>;

export type AxiosRequest = <R, A = unknown>(
  arg: AxiosRequestConfig<A>,
) => Promise<AxiosResponse<R>>;

export const axiosRequest = axios.create({ baseURL: '/api' });
