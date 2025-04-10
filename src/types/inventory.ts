export type TStatus = {
  id: number | string;
  value?: "ACTIVE" | "INACTIVE" | string;
  name?: "ACTIVE" | "INACTIVE" | string;
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
  Status: TStatus;
};

export type TSubcategory = {
  id: number;
  name: string;
  code: string;
  description: string | null;
  photo: string;
  Status: TStatus;
  category: {
    id: number;
    name: string;
    code: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type TBrand = {
  id: number;
  name: string;
  code: string;
  photo: string;
  statusId: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  enumValueId: number | null;
  Status: TStatus;
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
  Status: TStatus;
};

export type TWarranty = {
  id: number;
  name: string;
  description: string;
  duration: string;
  statusId: number;
  Status: TStatus;
};
