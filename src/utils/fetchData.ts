import useSWR, { Fetcher } from "swr";

type baseUrlType = string;

export function useFetchData<T>(baseUrl: baseUrlType) {
  const fetcher: Fetcher<T> = (url: string) => fetch(url).then(r => r.json());
  const { data, error } = useSWR(baseUrl, fetcher)
  return {
    data,
    error,
    isLoading: !error && !data,
  }
}
