import axios from "axios";
import { API } from "../../common/consts";

export async function getAuth(username: string) {
  return (await axios.get(API + `/auth?user=${username}`));
}