import { $instance } from "../../common/api/instance";
import { Contact, ContactPatch } from "./types";

export async function getContact(id: string): Promise<Contact> {
  return (await $instance.get(`/contacts/${id}`)).data;
}

export async function saveContact(id: string, contact: ContactPatch): Promise<Contact> {
  return (await $instance.patch(`/contacts/${id}`, { ...contact })).data
}
