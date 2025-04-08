import { API } from "../../common/consts";
import { Organization, OrganizationPatch } from "./types";
import { $instance } from "../../common/api/instance";

export async function getOrganization(id: string): Promise<Organization> {
  return (await $instance.get(API + `/companies/${id}`)).data;
}

export async function saveOrganization(id: string, organization: OrganizationPatch): Promise<Organization> {
  return (await $instance.patch(API + `/companies/${id}`, { ...organization })).data
}