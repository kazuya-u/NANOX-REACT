import { ActionFunction, Form, useParams } from "react-router-dom";
import { useFetchData } from "../utils/fetchData";
import styled from "styled-components";

const baseURL = "http://drupal.sandbox.dev.lando/jsonapi/node/task/";

export const action: ActionFunction = async ({ request, params }) => {
  const data = Object.fromEntries(await request.formData());

  const res = await fetch(`${baseURL}${params.taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
    },
    body: JSON.stringify({
      data: {
        type: "node--task",
        id: params.taskId,
        attributes: {
          title: data.title,
          field_description: data.description,
        },
      },
    }),
  });
  const task = await res.json();
  return { task };
};


const Task: React.FC = () => {
  const pageParams = useParams();
  const dataparams = '?include=field_ref_status,field_ref_project,field_ref_tags'
  const { data, error, isLoading } = useFetchData(`${baseURL}${pageParams.taskId}${dataparams}`);
  // const tagData = data.included.filter(item => item.type === "taxonomy_term--tags");
  // console.log(data.included[1].attributes.name);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <>{error}</>;
  return (
    <>
      <TaskDetailContainer>
        <div>
          <TaskProject>{data.included[1].attributes.name}</TaskProject>
        </div>
        <TaskName>{data.data.attributes.title}</TaskName>
        <TaskDetailWrapper>
        <div>
            <TaskStatus>{data.included[0].attributes.name}</TaskStatus>
        </div>
          <div>
            <div>更新時間:</div>
            <div>{data.data.attributes.created}</div>
          </div>
          <div>
            <div>期限:</div>
            <div>{data.data.attributes.field_deadline}</div>
          </div>
          <div>
            {/* <div>{tagData[2].attributes.name}</div> */}
          </div>
        </TaskDetailWrapper>
        <TaskBody>{data.data.attributes.field_description}</TaskBody>
      </TaskDetailContainer>
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

const TaskDetailContainer = styled.div`
  padding: 20px;
  border-radius: 8px;
`;

const TaskDetailWrapper = styled.div`
  padding: 20px 0 5px;
  border-bottom: 1px solid #ccc;
`;

const TaskName = styled.h2`
  font-size: 32px;
  line-height: 1.4;
  font-weight: 700;
  margin: 0;
`;

const TaskProject = styled.div`
  display: inline-block;
  border: 1px solid;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 16px;
  line-height: 1;
  font-weight: 600;
`;

const TaskStatus = styled.div`
  display: inline-flex;
  align-items: center;
  flex-shrink: 1;
  min-width: 0px;
  max-width: 100%;
  height: 20px;
  border-radius: 10px;
  padding-left: 7px;
  padding-right: 9px;
  font-size: 14px;
  line-height: 120%;
  color: rgb(24, 51, 71);
  background: rgb(211, 229, 239);
  margin: 0px;
`;

const TaskBody = styled.div`
  padding: 0 20px;
`;

const FormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  width: 100%;
  height: 120px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;

export default Task;
