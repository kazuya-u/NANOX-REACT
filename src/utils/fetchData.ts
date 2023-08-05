import useSWR from "swr";

type baseUrlType = string;
const fetcher = (url: string) => fetch(url).then(r => r.json());

export function useFetchData(baseUrl: baseUrlType) {
  const { data, error } = useSWR(baseUrl, fetcher)
  return {
    data,
    error,
    isLoading: !error && !data,
  }
}
