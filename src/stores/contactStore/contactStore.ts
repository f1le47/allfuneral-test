import { makeAutoObservable, runInAction } from "mobx";
import { Contact, ContactPatch } from "./types";
import { getContact, saveContact } from "./contactApi";

class ContactStore {
  contact: Contact | null = null;
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  getContact = async (id: string) => {
    try {
      runInAction(() => this.isLoading = true);
      const res: Contact = await getContact(id);
      runInAction(() => {
        this.contact = res;
        this.isLoading = false
      });
    } catch(e) {
      runInAction(() => this.isLoading = false);
    }
  }

  saveContact = async (id: string, contact: ContactPatch) => {
    try {
      runInAction(() => this.isLoading = true);
      const res: Contact = await saveContact(id, contact);
      runInAction(() => {
        this.contact = res;
        this.isLoading = false;
      })
    } catch(e) {
      runInAction(() => this.isLoading = false);
    }
  }
}

export const contactStore = new ContactStore();