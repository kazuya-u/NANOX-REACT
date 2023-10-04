import { GoPencil, GoTrash } from "react-icons/go";
import { IconButton } from "@mui/material";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { TaskBody, TaskDetailContainer, TaskDetailItem, TaskDetailItemLabel, TaskDetailWrapper, TaskName, TaskProject } from "../../Task/Detail/StyledComponens";
import { useFetchData } from "../../../utils/fetchData";
import { useModal } from "../../../feature/Modal/utils/useModal";
import { useParams } from "react-router-dom";
import Modal from "../../../feature/Modal/Index";
import NotePatchForm from "../Patch/Index";
import remarkBreaks from "remark-breaks";
import { NoteDeleteForm } from "../Delete/Index";

type DataType = {
  data: {
    attributes: {
      changed: string;
      created: string;
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

const dataParams =
  "?include=field_ref_project,field_ref_tag&fields[node--note]=name,title,changed,field_description&fields[uc--project]=title&fields[uc--tag]=title";

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
  const { data: NoteData } = useFetchData<DataType>(`${import.meta.env.VITE_LANDO_SITE_URL}/jsonapi/node/note/${pageParams.NoteId}${dataParams}`);
  if (!NoteData) {
    return <div>Loading...</div>;
  }
  // About DateTime Fields.
  const now: Date = new Date();
  // Convert to formatted ISO 8601 format for Changed.
  const changedValue = NoteData.data.attributes.changed;
  const changedDateTimeObject: Date = new Date(changedValue);
  let changed = '';
  if (isToday(changedDateTimeObject)) {
    const hourDiff = now.getHours() - changedDateTimeObject.getHours();
    const minutesDiff = now.getMinutes() - changedDateTimeObject.getMinutes();
    changed = `${changedDateTimeObject.getHours()}時間前に編集済み`;
    if (hourDiff === 0) {
      changed = `${changedDateTimeObject.getMinutes()}分前に編集`;
      if (minutesDiff === 0) {
        changed = `編集済み`;
      }
    }
  } else {
    changed = `${changedDateTimeObject.getFullYear()}/${changedDateTimeObject.getMonth()}/${changedDateTimeObject.getDate()}`;
  }
  const projectData = NoteData.included?.filter(
    (item) => item.type === "uc--project"
  ) || [];
  const tagData = NoteData.included?.filter(
    (item) => item.type === "uc--tag"
  ) || [];
  return (
    <>
      <TaskDetailContainer>
        <div>
          <TaskProject>
            {projectData?.length > 0
              ? projectData[0].attributes.title
              : "No Project"}
          </TaskProject>
        </div>
        <TaskName>{NoteData.data.attributes.title}</TaskName>
        <TaskDetailWrapper>
          <TaskDetailItem>
            <TaskDetailItemLabel>更新時間:</TaskDetailItemLabel>
            {changed}
          </TaskDetailItem>
          {tagData?.length > 0
            ? tagData.map((tag) => (
              <div key={tag.attributes.title}>{tag.attributes.title}</div>
            ))
            : ""}
          <IconButton aria-label="edit" size="small" onClick={() => openModal(<NotePatchForm id={pageParams.NoteId} />)}>
            <GoPencil />
          </IconButton>
          <IconButton aria-label="delete" size="small" onClick={() => openModal(<NoteDeleteForm id={pageParams.NoteId} />)}>
            <GoTrash />
          </IconButton>
          <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
            {modalContent}
          </Modal>
        </TaskDetailWrapper>
        <TaskBody className="markdown-body">
          <ReactMarkdown
            remarkPlugins={[remarkBreaks]}
          >
            {NoteData.data.attributes.field_description}
          </ReactMarkdown>
        </TaskBody>
      </TaskDetailContainer>
    </>
  );
};

export default Detail;
