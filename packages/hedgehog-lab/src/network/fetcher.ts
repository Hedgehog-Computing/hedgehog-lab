import {request} from "graphql-request";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const fetcher = (url: string, query: any) =>
    request(`https://api.hhlab.dev/${url}`, query);

// @ts-ignore
export const restFetcher = (...args: any[]) => fetch(...args).then((res) => res.json())

