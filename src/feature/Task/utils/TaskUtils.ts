import { useFetchData } from "../../../utils/fetchData";

type RelationsData = {
  data: Array<RelationData>;
};

type RelationData = {
  type: string;
  id: string;
  attributes: {
    name: string;
  };
};

export function useGetOptionsData(baseUrl: string) {
  const { data, isLoading } = useFetchData<RelationsData>(baseUrl);
  if (data) {
    const datas = data.data.map((item: RelationData) => ({
      label: item.attributes.name,
      value: item.id,
    }));
    return { datas }
  }
  return { isLoading }
}
