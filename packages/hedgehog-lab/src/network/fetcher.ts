import { request } from "graphql-request";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const fetcher = (query: any) => request("https://api.hhlab.dev/", query);
