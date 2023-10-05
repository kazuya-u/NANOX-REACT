import { GoPencil, GoTrash } from "react-icons/go";
import { IconButton } from "@mui/material";
import { TaskBody, TaskDetailContainer, TaskDetailItemLabel, TaskDetailWrapper, TaskName, TaskProject } from "../../Task/Detail/StyledComponens";
import { useFetchData } from "../../../utils/fetchData";
import { useModal } from "../../../feature/Modal/utils/useModal";
import { useParams } from "react-router-dom";
import Modal from "../../../feature/Modal/Index";
import NotePatchForm from "../Patch/Index";
import { NoteDeleteForm } from "../Delete/Index";
import { HtmltoMarkdownField, MultipleIncludeField, TimeDiffField } from "../../../components/Fields/Index";

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

const Detail: React.FC = () => {
  const { isModalOpen, openModal, closeModal, modalContent } = useModal();
  const pageParams = useParams();
  const { data: NoteData, error, isLoading } = useFetchData<DataType>(`${import.meta.env.VITE_LANDO_SITE_URL}/jsonapi/node/note/${pageParams.NoteId}${dataParams}`);
  if (error) return <>{error}</>;

  return (
    <>
      <TaskDetailContainer>
        <div>
          <TaskProject>
            {isLoading ? 'Loading...' : <MultipleIncludeField value={NoteData?.included} bundle="project" />}
          </TaskProject>
          {isLoading ? 'Loading...' : <MultipleIncludeField value={NoteData?.included} bundle="tag" />}
          <TaskDetailItemLabel>最終保存:</TaskDetailItemLabel>
          {isLoading ? 'Loading...' : <TimeDiffField value={NoteData?.data.attributes.changed} />}
        </div>
        <TaskName>{isLoading ? 'Loading...' : NoteData?.data.attributes.title}</TaskName>
        <TaskDetailWrapper>
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
          {isLoading ? 'Loading...' : <HtmltoMarkdownField value={NoteData?.data.attributes.field_description} />}
        </TaskBody>
      </TaskDetailContainer>
    </>
  );
};

export default Detail;
