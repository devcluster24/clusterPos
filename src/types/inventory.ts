export type TStatus = { id: number | string; value?: string; name?: string };

export type TCategory = {
  id: number;
  name: string;
  code: string;
  description: string | null;
  photo: string;
  statusId: number;
  createdAt: string;
  updatedAt: string;
  enumValueId: number | null;
  status: TStatus;
};
