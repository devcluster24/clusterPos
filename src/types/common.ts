/* eslint-disable @typescript-eslint/no-explicit-any */
export type IMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage?: number;
};

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  status?: number;
  statusCode?: number;
  data?: string;
  message?: string;
  errorMessages?: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export interface StatusCardProps {
  title: string;
  count: number;
  color: string;
}
