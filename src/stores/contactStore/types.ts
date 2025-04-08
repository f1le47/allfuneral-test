export interface Contact {
  id: string;
  lastname: string;
  firstname: string;
  phone: string;
  email: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export type ContactPatch = Partial<Pick<Contact, "lastname" | "firstname" | "phone" | "email">>