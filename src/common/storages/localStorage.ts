export const local = {
  get token() {
    return localStorage.getItem("token") ?? "";
  },
  set token(token: string) {
    localStorage.setItem("token", token);
  }
}