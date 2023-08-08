import { useParams } from "react-router-dom";
import { useFetchData } from "../../../utils/fetchData";
import { FormWrapper, Input, SubmitButton, Textarea } from "./StyledComponents";

type DateType = {
  data: {
    attributes: {
      title: string;
      field_description: string;
    }
  }
}

const Index: React.FC = () => {
  const baseUrl = "http://drupal.sandbox.dev.lando/jsonapi/node/task/";
  const pageParams = useParams();
  const { data, error } = useFetchData<DateType>(
    `${baseUrl}${pageParams.taskId}`
  );
  if (error) {
    return <div>データが取得できませんでした。</div>
  }
  if (!data) {
    return <div>Loading...</div>
  }
  
  return (
    <>
      <FormWrapper method="post">
        <Input
          name="title"
          placeholder="title"
          defaultValue={data.data.attributes.title}
        />
        <br />
        <Textarea
          name="description"
          id=""
          defaultValue={data.data.attributes.field_description}
        ></Textarea>
        <br />
        <SubmitButton type="submit">Submit</SubmitButton>
      </FormWrapper>
    </>
  );
};

export default Index;
