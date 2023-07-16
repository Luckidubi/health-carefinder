import useSWR, { Fetcher } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useUser(id: string) {
  const { data, error, isLoading } = useSWR(`/api/users/${id}`, fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
  };
}
