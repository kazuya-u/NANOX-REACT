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

type Option = {
  label: string;
  value: string;
};

export function GetOptions(baseUrl: string): Option[] {
  const { data } = useFetchData<OptionsData>(baseUrl);
  if (data) {
    const datas = data.data.map((item: OptionData) => ({
      label: item.attributes.name,
      value: item.id,
    }));
    return datas;
  } else {
    const datas: Option[] = [{
      label: '読み込み中',
      value: '',
    }];
    return datas;
  }
}

export async function postData<T>(baseUrl: string, headers: HeadersInit, bodyData: T) {
  return await fetch(baseUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(bodyData)
  }).then(res => res.json());
}

export async function patchData<T>(baseUrl: string, headers: HeadersInit, bodyData: T) {
  return await fetch(baseUrl, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(bodyData)
  }).then(res => res.json());
}
