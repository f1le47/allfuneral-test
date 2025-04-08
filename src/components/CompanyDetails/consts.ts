import { BusinessEntity, OrgTypes } from "../../stores/organizationStore/types";

export const BUSINESS_ENTITIES = [BusinessEntity.SaleProprietorship, BusinessEntity.Partnership, BusinessEntity.LimitedLiabilityCompany];
export const ORG_TYPES_DISPLAY_NAMES: Record<OrgTypes, string> = {
  [OrgTypes.FuneralHome]: "Funeral Home",
  [OrgTypes.BurialCareContractor]: "Burial care Contractor",
  [OrgTypes.LogisticsServices]: "Logistics services"
}
export const ORG_TYPES = [
  ORG_TYPES_DISPLAY_NAMES[OrgTypes.FuneralHome],
  ORG_TYPES_DISPLAY_NAMES[OrgTypes.LogisticsServices],
  ORG_TYPES_DISPLAY_NAMES[OrgTypes.BurialCareContractor]
];
