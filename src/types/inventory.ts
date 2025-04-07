export type TStatus = {
  id: number | string;
  value?: string;
  name?: string;
  codeName?: string;
  description?: string;
};

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

export type TUnit = {
  id: number;
  name: string;
  code: string;
  codeName: string;
  unitTypeId: number;
  baseUnitId: number;
  multiplier: number;
  statusId: number;
  multiplierUnitDetails: string;
  createdAt: string;
  updatedAt: string;
  enumValueId: number | null;
  unitId: number | null;
  status: {
    id: number;
    value: string;
  };
};
