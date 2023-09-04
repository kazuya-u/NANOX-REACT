import "github-markdown-css/github-markdown.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { TaskBody, TaskDetailContainer, TaskDetailItem, TaskDetailItemLabel, TaskDetailWrapper, TaskName, TaskProject, TaskStatus } from "./StyledComponens";
import { useFetchData } from "../../../utils/fetchData";
import { useLocation, useParams } from "react-router-dom";
import { GoPencil, GoTrash } from "react-icons/go";
import { IconButton } from "@mui/material";
import { useModal } from "../../../feature/Modal/utils/useModal";
import TaskPatchForm from "../Patch/Index";
import Modal from "../../../feature/Modal/Index";

type DataType = {
  data: {
    attributes: {
      created: string;
      field_deadline: string;
      field_description: string;
      name: string;
      title: string;
    };
  };
  included: Array<RelationData>;
};

type RelationData = {
  attributes: {
    name: string;
  };
  type: string;
};

function formatDate(timestamp: string): string {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat("ja-JP", options).format(date);
}

const Detail: React.FC = () => {
  const { isModalOpen, openModal, closeModal, modalContent } = useModal();
  const baseURL = `${import.meta.env.VITE_LANDO_SITE_URL}/jsonapi/node/task/`;
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
  const projectData = data.included.filter(
    (item) => item.type === "taxonomy_term--project"
  );
  const tagData = data.included.filter(
    (item) => item.type === "taxonomy_term--tags"
  );

  const onClick = async () => {
    const endpoint = `${baseURL}${pageParams.taskId}`;
    const headers = {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
    };
    try {
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const responseData = await response.text();
      const jsonResponse = responseData ? JSON.parse(responseData) : null;
      return jsonResponse;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <TaskDetailContainer>
        <div>
          <TaskProject>
            {projectData.length > 0
              ? projectData[0].attributes.name
              : "No Project"}
          </TaskProject>
        </div>
        <TaskName>{data.data.attributes.title}</TaskName>
        <TaskDetailWrapper>
          <TaskDetailItem>
            <TaskStatus>{data.included[0].attributes.name}</TaskStatus>
          </TaskDetailItem>
          <TaskDetailItem>
            <TaskDetailItemLabel>更新時間:</TaskDetailItemLabel>
            {formatDate(data.data.attributes.created)}
          </TaskDetailItem>
          <TaskDetailItem>
            <TaskDetailItemLabel>期限:</TaskDetailItemLabel>
            {formatDate(data.data.attributes.field_deadline)}
          </TaskDetailItem>
          {tagData.length > 0
            ? tagData.map((tag) => (
              <div key={tag.attributes.name}>{tag.attributes.name}</div>
            ))
            : ""}
            <IconButton aria-label="edit" size="small" onClick={() => openModal(<TaskPatchForm />)}>
              <GoPencil />
            </IconButton>
          <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
            {modalContent}
          </Modal>
          <IconButton aria-label="delete" size="small" onClick={onClick}>
            <GoTrash />
          </IconButton>
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
