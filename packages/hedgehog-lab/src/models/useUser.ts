import useSWR from "swr";
import { fetcher } from "../network/fetcher";

const useUser = (id: number) => {
  const { data, error } = useSWR(`/user/id${id}`, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};
