import axios from "axios";
import { API } from "../consts";
import { local } from "../storages/localStorage";

export const $instance = axios.create({baseURL: API, headers: { Authorization: local.token } });