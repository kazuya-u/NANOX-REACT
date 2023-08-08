import { useFetchData } from "../../../utils/fetchData";

const baseUrl = "https://drupal.sandbox.dev.lando/tasks";

export function useGetViewsData<T>() {
  const { data, error } = useFetchData<T>(baseUrl);
  return {
    data,
    error,
  }
}
