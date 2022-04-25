import useSWR from "swr";
import {request} from "graphql-request";

export const fetcher = (url: string, query: any) =>
    request(`https://api.hlab.app/${url}`, query);

const useUser = (id: number) => {
    const {data, error} = useSWR(
        {
            query: `query { user(id: ${id}) { id, name, email } }`,
            variables: {},
        },
        fetcher
    );

    return {
        user: data,
        isLoading: !error && !data,
        isError: error,
    };
};
