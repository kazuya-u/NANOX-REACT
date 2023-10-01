import useSWR, { Fetcher } from "swr";
import { getAccessTokenFromLocalStorage } from "../feature/AuthUser/utils/LocalStorageUtils";

type baseUrlType = string;

export function useFetchData<T>(baseUrl: baseUrlType) {
  const accessToken = getAccessTokenFromLocalStorage();
  const headers = {
    "Authorization": `Bearer ${accessToken}`,
  };
  const fetcher: Fetcher<T> = (url: string) => fetch(url, { headers }).then(r => r.json());
  const { data, error } = useSWR(baseUrl, fetcher, { refreshInterval: 1000 })
  return {
    data,
    error,
    isLoading: !error && !data,
  }
}

export function useFetchDataNoMutate<T>(baseUrl: baseUrlType) {
  const accessToken = getAccessTokenFromLocalStorage();
  const headers = {
    "Authorization": `Bearer ${accessToken}`,
  };
  const fetcher: Fetcher<T> = (url: string) => fetch(url, { headers }).then(r => r.json());
  const { data, error } = useSWR(baseUrl, fetcher)
  return {
    data,
    error,
    isLoading: !error && !data,
  }
}
