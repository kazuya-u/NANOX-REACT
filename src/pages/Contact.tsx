import { useLocation } from "react-router-dom";
import { useFetchData } from "../utils/fetchData";
import Select from "react-select";
import { useGetRelationsData } from "../feature/Task/utils/TaskUtils";

type ProjectDate = {
  data: Array<ProjectItemData>;
};

type ProjectItemData = {
  type: string;
  id: string;
  attributes: {
    name: string;
  };
};



const Contact: React.FC = () => {
  const projectUrl =
  "http://drupal.sandbox.dev.lando/jsonapi/taxonomy_term/project?fields[taxonomy_term--project]=name";
  const { datas } = useGetRelationsData(projectUrl);
  console.log(datas);
  
  const location = useLocation();
  console.log(location);
  const baseUrl =
    "http://drupal.sandbox.dev.lando/jsonapi/taxonomy_term/project?fields[taxonomy_term--project]=name";
  const { data } = useFetchData<ProjectDate>(baseUrl);
  if (!data) {
    return <div>Loading...</div>;
  }
  const options = data.data.map((item: ProjectItemData) => ({
    label: item.attributes.name,
    value: item.id,
  }));

  return (
    <>
      <h2>Contact</h2>
      <Select options={options} />
    </>
  );
};

export default Contact;
