import { useLocation } from "react-router-dom";
import { useFetchData } from "../utils/fetchData";
import Select from "react-select";

interface TaxonomyTerm {
  data: {
    type: string;
    id: string;
    attributes: {
      field_machine_name: string;
      name: string;
    };
  }
}

const Contact: React.FC = () => {
  const location = useLocation();
  console.log(location);
  const baseUrl = "http://drupal.sandbox.dev.lando/jsonapi/taxonomy_term/project";
  const { data, error } = useFetchData<TaxonomyTerm>(baseUrl);
  if (!data) {
    return <div>Loading...</div>;
  }
  console.log(data.data);
  
  const options = data.data.map(item => ({
    value: item.id,
    label: item.attributes.name,
  }));
  console.log(options);
  
  return (
    <>
      <h2>Contact</h2>
      <Select 
        options={options}
      />
      
    </>
  );
}

export default Contact
