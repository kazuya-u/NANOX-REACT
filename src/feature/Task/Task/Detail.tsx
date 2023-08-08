import "github-markdown-css/github-markdown.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { TaskBody, TaskDetailContainer, TaskDetailItem, TaskDetailItemLabel, TaskDetailWrapper, TaskName, TaskProject, TaskStatus } from "./StyledComponens";
import { useFetchData } from "../../../utils/fetchData";
import { useParams } from "react-router-dom";

type DataType = {
  data: {
    attributes: {
      created: string;
      field_deadline: string;
      field_description: string;
      name: string;
      title: string;
    }
  },
  included: Array<RelationData>
}

type RelationData = {
  attributes: {
    name: string;
  }
  type: string;
}

const Detail: React.FC = () => {
  const baseURL = "http://drupal.sandbox.dev.lando/jsonapi/node/task/";
  const pageParams = useParams();
  const dataParams =
    "?include=field_ref_status,field_ref_project,field_ref_tags&fields[node--task]=name,title,created,field_deadline,field_description&fields[taxonomy_term--project]=name&fields[taxonomy_term--tags]=name";
  const { data, error, isLoading } = useFetchData<DataType>(
    `${baseURL}${pageParams.taskId}${dataParams}`
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <>{error}</>;
  if (!data) {
    return <div>Loading...</div>;
  }
  const projectData = data.included.filter(item => item.type === "taxonomy_term--project");
  const tagData = data.included.filter(item => item.type === "taxonomy_term--tags");
  
  return (  
    <>
      <TaskDetailContainer>
        <div>
          <TaskProject>{projectData[0].attributes.name}</TaskProject>
        </div>
        <TaskName>{data.data.attributes.title}</TaskName>
        <TaskDetailWrapper>
          <TaskDetailItem>
            <TaskStatus>{data.included[0].attributes.name}</TaskStatus>
          </TaskDetailItem>
          <TaskDetailItem>
            <TaskDetailItemLabel>更新時間:</TaskDetailItemLabel>
            <div>{data.data.attributes.created}</div>
          </TaskDetailItem>
          <TaskDetailItem>
            <TaskDetailItemLabel>期限:</TaskDetailItemLabel>
            <div>{data.data.attributes.field_deadline}</div>
          </TaskDetailItem>
          <div>{<div>{tagData[0].attributes.name}</div>}</div>
        </TaskDetailWrapper>
        <TaskBody className="markdown-body">
          <ReactMarkdown>
            {data.data.attributes.field_description}
          </ReactMarkdown>
        </TaskBody>
      </TaskDetailContainer>
    </>
  );
};

export default Detail;
