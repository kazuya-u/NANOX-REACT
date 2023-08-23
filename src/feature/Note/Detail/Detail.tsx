import { GoPencil, GoTrash } from "react-icons/go";
import { IconButton } from "@mui/material";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { TaskBody, TaskDetailContainer, TaskDetailItem, TaskDetailItemLabel, TaskDetailWrapper, TaskName, TaskProject } from "../../Task/Detail/StyledComponens";
import { useFetchData } from "../../../utils/fetchData";
import { Link, useParams } from "react-router-dom";

type DataType = {
  data: {
    attributes: {
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
    name: string;
  };
  type: string;
};

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("ja-JP", options);
};

const Detail: React.FC = () => {
  const pageParams = useParams();
  const dataParams =
    "?include=field_ref_project,field_ref_tags&fields[node--note]=name,title,created,field_description&fields[taxonomy_term--project]=name&fields[taxonomy_term--tags]=name";

  const { data: NoteData } = useFetchData<DataType>(`${import.meta.env.VITE_LANDO_SITE_URL}/jsonapi/node/note/${pageParams.NoteId}${dataParams}`);
  console.log(NoteData);
  if (!NoteData) {
    return <div>Loading...</div>;
  }
  const projectData = NoteData.included.filter(
    (item) => item.type === "taxonomy_term--project"
  );
  const tagData = NoteData.included.filter(
    (item) => item.type === "taxonomy_term--tags"
  );
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
        <TaskName>{NoteData.data.attributes.title}</TaskName>
        <TaskDetailWrapper>
          <TaskDetailItem>
            <TaskDetailItemLabel>更新時間:</TaskDetailItemLabel>
            {formatDate(parseInt(NoteData.data.attributes.created))}
          </TaskDetailItem>
          <TaskDetailItem>
            <TaskDetailItemLabel>期限:</TaskDetailItemLabel>
            {formatDate(parseInt(NoteData.data.attributes.created))}
          </TaskDetailItem>
          {tagData.length > 0
            ? tagData.map((tag) => (
              <div key={tag.attributes.name}>{tag.attributes.name}</div>
            ))
            : ""}
          <Link to={"edit"}>
            <IconButton aria-label="edit" size="small">
              <GoPencil />
            </IconButton>
          </Link>
          <IconButton aria-label="delete" size="small">
            <GoTrash />
          </IconButton>
        </TaskDetailWrapper>
        <TaskBody className="markdown-body">
          <ReactMarkdown>
            {NoteData.data.attributes.field_description}
          </ReactMarkdown>
        </TaskBody>
      </TaskDetailContainer>
    </>
  );
};

export default Detail;
