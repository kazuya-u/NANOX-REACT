import { useFetchData } from "../../../utils/fetchData";

const Index: React.FC = () => {
  const { data: TipsListData, error } = useFetchData(`${import.meta.env.VITE_LANDO_SITE_URL}/jsonapi/node/tips`);
  if (!TipsListData && !error) {
    return <>Loading...</>
  }
  console.log(TipsListData);
  console.log(TipsListData.data[0].attributes.title);
  
  
  return (
    <>
      {TipsListData.data[0].attributes.title}
      {TipsListData.data[1].attributes.title}
    </>
  );
};

export default Index;
