import { BASE_API_URL } from "../../../utils/EndPoint";
import { useFetchData } from "../../../utils/fetchData";
import { RelationData, RelationDatas } from "../type/Index";

// Get Note View Data.
const NOTE_VIEWS_ENDPOINT = `${BASE_API_URL}/note`;
export function useGetViewsData<T>() {
  const { data, error } = useFetchData<T>(NOTE_VIEWS_ENDPOINT);
  return {
    data,
    error,
  }
}

// Get Related Data to get defalut value When PATCH request.
type Option = {
  label: string;
  value: string;
};

export function GetOptions(baseUrl: string): Option[] {
  const { data } = useFetchData<RelationDatas>(baseUrl);
  if (data) {
    const datas = data.data.map((item: RelationData) => ({
      label: item.attributes.title,
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

export function ExtractDefaultOptionData(data: RelationData) {
  if (!data) {
    return {
      label: 'No setting',
      value: '',
    }
  }
  return {
    label: data.attributes.name,
    value: data.id,
  };
}
