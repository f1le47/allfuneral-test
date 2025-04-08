import { OrgTypes } from "../../stores/organizationStore/types";
import { ORG_TYPES_DISPLAY_NAMES } from "./consts";

export const getDateStringFromISO = (date: string): string => {
  const dateObj = new Date(date);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();

  return `${month}.${day}.${year}`;
}

export const convertType = {
  toDisplay: (type: OrgTypes[]): string[] => type.map(t => ORG_TYPES_DISPLAY_NAMES[t]),
  fromDisplay: (displayType: string[]): OrgTypes[] => {
    return displayType.map(name =>
      (Object.entries(ORG_TYPES_DISPLAY_NAMES).find(([_, displayName]) => displayName === name)?.[0] as OrgTypes)
    ).filter(type => type !== undefined);
  }
}
