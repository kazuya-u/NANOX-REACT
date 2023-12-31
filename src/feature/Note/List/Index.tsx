import { useFetchData } from "../../../utils/fetchData";
import { ListItem,ListWrapper, ProjectName, StyledLink, Tag, TagContainer, TaskDescription, TaskLeftWrapper, TaskName, TaskRightWrapper } from "../../Task/List/StyledComponents";

type ItemType = {
  Created: string;
  Description: string;
  NodeId: string;
  ProjectName: string;
  TagsName: string;
  Title: string;
  UUID: string;
}

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("ja-JP", options);
};

const Index: React.FC = () => {
  const { data: NotesListData } = useFetchData<ItemType[]>(`${import.meta.env.VITE_LANDO_SITE_URL}/note`);
  
  if (!NotesListData) {
    return <>Loading...</>
  }
  console.log(NotesListData);
  
  return (
    <>
      <ListWrapper>
        {NotesListData.map((item: ItemType) => (
          <ListItem key={item.NodeId}>
            <StyledLink to={`/notes/${item.UUID}`}>
              <TaskLeftWrapper>
                <TaskName>{item.Title}</TaskName>
                <TaskDescription>{item.Description}</TaskDescription>
                <TaskDescription>{formatDate(parseInt(item.Created))}</TaskDescription>
                {item.TagsName ? (
                  <TagContainer>
                    {item.TagsName.split(',').map((tag: string, index: number) => (
                      <Tag key={index}><span>{tag.trim()}</span></Tag>
                    ))}
                  </TagContainer>
                ) : ''}
              </TaskLeftWrapper>
              <TaskRightWrapper>
                <ProjectName>{item.ProjectName}</ProjectName>
              </TaskRightWrapper>
            </StyledLink>
          </ListItem>
        ))}
      </ListWrapper>
    </>
  );
};

export default Index;
