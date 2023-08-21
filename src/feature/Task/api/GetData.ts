import { useFetchData } from "../../../utils/fetchData";

const baseUrl = `${import.meta.env.VITE_LANDO_SITE_URL}/tasks`;

export function useGetViewsData<T>() {
  const { data, error } = useFetchData<T>(baseUrl);
  return {
    data,
    error,
  }
}
