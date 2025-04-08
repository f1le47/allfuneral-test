import { Organization, OrganizationPatch, Photo } from "./types";
import { $instance } from "../../common/api/instance";

export async function getOrganization(id: string): Promise<Organization> {
  return (await $instance.get(`/companies/${id}`)).data;
}

export async function saveOrganization(id: string, organization: OrganizationPatch): Promise<Organization> {
  return (await $instance.patch(`/companies/${id}`, { ...organization })).data
}

export async function removeOrganization(id: string): Promise<undefined> {
  return (await $instance.delete(`/companies/${id}`)).data;
}

export async function deletePhoto(id: string, photoName: string): Promise<undefined> {
  return (await $instance.delete(`/companies/${id}/image/${photoName}`)).data;
}

export async function addPhoto(id: string, photo: File): Promise<Photo> {
  const formData = new FormData();
  formData.append('file', photo);

  return (await $instance.post(`/companies/${id}/image`, formData, { headers: {
    "Content-Type": 'multipart/form-data',
  }})).data
}