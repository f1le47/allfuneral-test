import { makeAutoObservable } from "mobx";
import { Organization, OrganizationPatch } from "./types";
import { getOrganization, saveOrganization } from "./organizationApi";

class OrganizationStore {
  organization: Organization | null = null;
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  getOrganization = async (id: string) => {
    try {
      this.isLoading = true;
      const res: Organization = await getOrganization(id);
      this.organization = res;
      this.isLoading = false;
    } catch(e) {
      this.isLoading = false;
    }
  }

  saveOrganization = async (id: string, organization: OrganizationPatch) => {
    try {
      this.isLoading = true;
      const res: Organization = await saveOrganization(id, organization);
      this.organization = res;
      this.isLoading = false;
    } catch(e) {
      this.isLoading = false;
    }
  }
}

export const organizationStore = new OrganizationStore();