import "github-markdown-css/github-markdown.css";
import { DateTimeField, HtmltoMarkdownField, MultipleIncludeField, TimeDiffField } from "../../../components/Fields/Index";
import { GoPencil, GoTrash } from "react-icons/go";
import { IconButton } from "@mui/material";
import { TaskBody, TaskDetailContainer, TaskDetailItem, TaskDetailItemLabel, TaskDetailWrapper, TaskName, TaskProject, TaskStatus } from "./StyledComponens";
import { TaskDeleteForm } from "../Delete/Index";
import { useFetchData } from "../../../utils/fetchData";
import { useModal } from "../../../feature/Modal/utils/useModal";
import { useParams } from "react-router-dom";
import Modal from "../../../feature/Modal/Index";
import TaskPatchForm from "../Patch/Index";

type DataType = {
  data: {
    attributes: {
      created: string;
      changed: string;
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
    title: string;
  };
  type: string;
};

const BASE_URL = `${import.meta.env.VITE_LANDO_SITE_URL}/jsonapi/node/task/`;

const PARAMETER =
"?include=field_ref_status,field_ref_project,field_ref_tag&fields[node--task]=name,title,changed,field_deadline,field_description&fields[uc--project]=title&fields[uc--tag]=title&fields[uc--status]=title";

const Index: React.FC = () => {
  const { isModalOpen, openModal, closeModal, modalContent } = useModal();
  const pageParams = useParams();
  const pageId = pageParams.taskId;
  const { data: TaskData, error, isLoading } = useFetchData<DataType>(
    `${BASE_URL}${pageId}${PARAMETER}`
  );
  if (error) return <>{error}</>;
  
  return (
    <>
      <TaskDetailContainer>
        <div>
          <TaskProject>
            {isLoading ? 'Loading...' : <MultipleIncludeField value={TaskData?.included} bundle="project" />}
          </TaskProject>
          {isLoading ? 'Loading...' : <MultipleIncludeField value={TaskData?.included} bundle="tag" />}
          <TaskDetailItemLabel>最終保存:</TaskDetailItemLabel>
          {isLoading ? 'Loading...' : <TimeDiffField value={TaskData?.data.attributes.changed} />}
        </div>
        <TaskName>{isLoading ? 'Loading...' : TaskData?.data.attributes.title}</TaskName>
        <TaskDetailWrapper>
          <TaskDetailItem>
            <TaskStatus>
              {isLoading ? 'Loading...' : <MultipleIncludeField value={TaskData?.included} bundle="status" />}
            </TaskStatus>
          </TaskDetailItem>
          <TaskDetailItem>
          </TaskDetailItem>
          <TaskDetailItem>
            <TaskDetailItemLabel>期限:</TaskDetailItemLabel>
            {isLoading ? 'Loading...' : <DateTimeField value={TaskData?.data.attributes.field_deadline} />}
            
          </TaskDetailItem>
          <IconButton aria-label="edit" size="small" onClick={() => openModal(<TaskPatchForm id={pageId} />)}>
            <GoPencil />
          </IconButton>
          <IconButton aria-label="delete" size="small" onClick={() => openModal(<TaskDeleteForm id={pageId} />)}>
            <GoTrash />
          </IconButton>
          <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
            {modalContent}
          </Modal>
        </TaskDetailWrapper>
        <TaskBody className="markdown-body">
            {isLoading ? 'Loading...' : <HtmltoMarkdownField value={TaskData?.data.attributes.field_description} />}
        </TaskBody>
      </TaskDetailContainer>
    </>
  );
};

export default Index;
