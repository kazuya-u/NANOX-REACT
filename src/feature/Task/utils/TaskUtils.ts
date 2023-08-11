import { useFetchData } from "../../../utils/fetchData";

type OptionsData = {
  data: Array<OptionData>;
};

type OptionData = {
  type: string;
  id: string;
  attributes: {
    name: string;
  };
};

export function useGetOptionData(baseUrl: string) {
  const { data, isLoading } = useFetchData<OptionsData>(baseUrl);
  if (data) {
    const datas = data.data.map((item: OptionData) => ({
      label: item.attributes.name,
      value: item.id,
    }));
    return { datas }
  }
  return { isLoading }
}

export async function postData<T>(baseUrl: string, headers: HeadersInit, bodyData: T) {
  return fetch(baseUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(bodyData)
  }).then(res => res.json());
}
