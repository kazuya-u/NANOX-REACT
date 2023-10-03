import "github-markdown-css/github-markdown.css";
import { GoPencil, GoTrash } from "react-icons/go";
import { IconButton } from "@mui/material";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { TaskBody, TaskDetailContainer, TaskDetailItem, TaskDetailItemLabel, TaskDetailWrapper, TaskName, TaskProject, TaskStatus } from "./StyledComponens";
import { TaskDeleteForm } from "../Delete/Index";
import { useFetchData } from "../../../utils/fetchData";
import { useModal } from "../../../feature/Modal/utils/useModal";
import { useParams } from "react-router-dom";
import Modal from "../../../feature/Modal/Index";
import TaskPatchForm from "../Patch/Index";

const BASE_URL = `${import.meta.env.VITE_LANDO_SITE_URL}/jsonapi/node/task/`;

const PARAMETER =
"?include=field_ref_status,field_ref_project,field_ref_tag&fields[node--task]=name,title,changed,field_deadline,field_description&fields[uc--project]=title&fields[uc--tag]=title&fields[uc--status]=title";

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

function isToday(targetDateTime: Date) {
  const currentDate = new Date();
  return (
    targetDateTime.getFullYear() === currentDate.getFullYear() &&
    targetDateTime.getMonth() === currentDate.getMonth() &&
    targetDateTime.getDate() === currentDate.getDate()
  );
}

const Detail: React.FC = () => {
  const { isModalOpen, openModal, closeModal, modalContent } = useModal();
  const pageParams = useParams();
  const pageId = pageParams.taskId;
  const { data: TaskData, error, isLoading } = useFetchData<DataType>(
    `${BASE_URL}${pageId}${PARAMETER}`
  );
  if (isLoading) return <div>Loading...</div>;
  if (error) return <>{error}</>;
  if (!TaskData) {
    return <div>Loading...</div>;
  }
  // About DateTime Fields.
  const now: Date = new Date();
  // Convert to formatted ISO 8601 format for DeadLine.
  const deadlineValue = TaskData.data.attributes.field_deadline;
  const dlDateTimeObject = new Date(deadlineValue);
  const deadLine = `${dlDateTimeObject.getFullYear()}/${String(dlDateTimeObject.getMonth() + 1).padStart(2, "0")}/${String(dlDateTimeObject.getDate()).padStart(2, "0")}-${String(dlDateTimeObject.getHours()).padStart(2, "0")}:${String(dlDateTimeObject.getMinutes()).padStart(2, "0")}`;
  // Convert to formatted ISO 8601 format for Changed.
  const changedValue = TaskData.data.attributes.changed;
  const changedDateTimeObject: Date = new Date(changedValue);
  let changed ='';
  if (isToday(changedDateTimeObject)) {
    const hourDiff = now.getHours() - changedDateTimeObject.getHours();
    const minutesDiff = now.getMinutes() - changedDateTimeObject.getMinutes();
    changed = `${hourDiff}時間前に編集済み`;
    if (hourDiff === 0) {
      changed = `${minutesDiff}分前に編集`;
      if (minutesDiff === 0) {
        changed = `編集済み`;
      }
    } 
  } else {
    changed = `${changedDateTimeObject.getFullYear()}/${changedDateTimeObject.getMonth() + 1}/${changedDateTimeObject.getDate()}`;
  }
  // About Category.
  let projectData = [];
  let statusData = [];
  let tagData = [];
  projectData = TaskData.included?.filter(
    (item) => item.type === "uc--project"
  );
  statusData = TaskData.included?.filter(
    (item) => item.type === "uc--status"
  );
  tagData = TaskData.included?.filter(
    (item) => item.type === "uc--tag"
  );
  return (
    <>
      <TaskDetailContainer>
        <div>
          <TaskProject>
            {projectData?.length > 0
              ? projectData[0].attributes.title
              : "No Project"}
          </TaskProject>
          {tagData?.length > 0
            ? tagData.map((tag) => (
              <div key={tag.attributes.title}>{tag.attributes.title}</div>
            ))
            : ""}
          <TaskDetailItemLabel>最終保存:</TaskDetailItemLabel>{changed}
        </div>
        <TaskName>{TaskData.data.attributes.title}</TaskName>
        <TaskDetailWrapper>
          <TaskDetailItem>
            <TaskStatus>
              {statusData?.length > 0
                ? statusData[0].attributes.title
                : "No Status"}
            </TaskStatus>
          </TaskDetailItem>
          <TaskDetailItem>

          </TaskDetailItem>
          <TaskDetailItem>
            <TaskDetailItemLabel>期限:</TaskDetailItemLabel>
            {deadLine}
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
          <ReactMarkdown>
            {TaskData.data.attributes.field_description}
          </ReactMarkdown>
        </TaskBody>
      </TaskDetailContainer>
    </>
  );
};

export default Detail;
