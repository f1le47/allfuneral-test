export interface Contract {
  no: string;
  issue_date: string; // ISO string
}

export enum Status {
  Active = "active",
}

export interface Photo {
  name: string;
  filepath: string;
  thumbpath: string;
  createdAt: string; // ISO string
}

export enum BusinessEntity {
  SaleProprietorship = "Sale Proprietorship",
  Partnership = "Partnership",
  LimitedLiabilityCompany = "Limited Liability Company",
}

export enum OrgTypes {
  FuneralHome = "funeral_home",
  LogisticsServices = "logistics_services",
  BurialCareContractor = "burial_care_contractor",
}

export interface Organization {
  id: string;
  contactId: string;
  name: string;
  shortName: string;
  businessEntity: BusinessEntity;
  contract: Contract;
  type: OrgTypes[];
  status: Status;
  photos: Photo[];
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export type OrganizationPatch = Partial<Pick<Organization, "name" | "shortName" | "businessEntity" | "contract" | "type">>