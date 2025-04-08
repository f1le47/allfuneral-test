import { makeAutoObservable, runInAction } from "mobx";
import { Organization, OrganizationPatch } from "./types";
import { addPhoto, deletePhoto, getOrganization, removeOrganization, saveOrganization } from "./organizationApi";

class OrganizationStore {
  organization: Organization | null = null;
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  getOrganization = async (id: string) => {
    try {
      runInAction(() => this.isLoading = true);
      const res: Organization = await getOrganization(id);
      runInAction(() => {
        this.organization = res;
        this.isLoading = false;
      });
    } catch(e) {
      runInAction(() => this.isLoading = false);
    }
  }

  saveOrganization = async (id: string, organization: OrganizationPatch) => {
    try {
      runInAction(() => this.isLoading = true);
      const res: Organization = await saveOrganization(id, organization);
      runInAction(() => {
        this.organization = res;
        this.isLoading = false;
      })
    } catch(e) {
      runInAction(() => this.isLoading = false);
    }
  }

  removeOrganization = async (id: string) => {
    try {
      runInAction(() => this.isLoading = true);
      await removeOrganization(id);
      runInAction(() => {
        this.organization = null;
        this.isLoading = false;
      });
    } catch(e) {
      runInAction(() => {
        this.isLoading = false;
      })

    }
  }

  deletePhoto = async (id: string, photoName: string) => {
    try {
      runInAction(() => this.isLoading = true);
      await deletePhoto(id, photoName);
      runInAction(() => {
        if (this.organization) {
          this.organization = { ...this.organization, photos: this.organization?.photos.filter(photo => photo.name !== photoName) };
        }
        this.isLoading = false;
      })
    } catch(e) {
      runInAction(() => this.isLoading = false);
    }
  }

  addPnoto = async (id: string, photoFile: File) => {
    try {
      runInAction(() => this.isLoading = true);
      const photo = await addPhoto(id, photoFile);
      runInAction(() => {
        if (this.organization) {
          this.organization = { ...this.organization, photos: [...this.organization.photos, photo] };
        }
        this.isLoading = false;
      });
    } catch(e) {
      runInAction(() => {
        this.isLoading = false;
      })
    }
  }
}

export const organizationStore = new OrganizationStore();