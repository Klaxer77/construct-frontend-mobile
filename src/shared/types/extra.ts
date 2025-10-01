import { endpoints } from "../config/endpoints";
import { api } from "../config/api"

export type Extra = {
  api: typeof api;
  endpoints: typeof endpoints;
};