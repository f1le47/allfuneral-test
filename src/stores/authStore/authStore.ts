import { makeAutoObservable, runInAction } from "mobx";
import { getAuth } from "./authApi";
import { local } from "../../common/storages/localStorage";

class AuthStore {
  isLoading: boolean = false;
  isAuth: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  getAuth = async (username: string) => {
    try {
      runInAction(() => this.isLoading = true);
      const res = await getAuth(username);
      runInAction(() => {
        local.token = res.headers.authorization;
        this.isAuth = true;
        this.isLoading = false;
      });
    } catch(e) {
      runInAction(() => this.isLoading = false);
    }
  }
}

export const authStore = new AuthStore();