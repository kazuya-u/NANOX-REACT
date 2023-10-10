import TaskPatchForm from "../../../../../feature/Task/Patch/Index";
import Modal from "../../../../../feature/Modal/Index";
import { useModal } from "../../../../../feature/Modal/utils/useModal";
import styled from "styled-components";

interface Card {
  title: string;
  uuid: string;
  field_deadline: string;
  ProjectName: string;
  TagName: string;
}

const Card: React.FC<Card> = ({ title, ProjectName, field_deadline, TagName, uuid }) => {
  const { isModalOpen, openModal, closeModal, modalContent } = useModal();
  return (
    <>
    <StyledCard onClick={() => openModal(<TaskPatchForm id={uuid} />)}>
      <StyledItemTitle>
        <StyledItemTitleWrapper>
          {title}
        </StyledItemTitleWrapper>
      </StyledItemTitle>
      <StyledItemCategorys>
        <StyledItemCategory>
          <StyledItemProjectWrapper>
            <StyledItemProjectInnerWrapper>
              <div><StyledItemProjectText>{ProjectName}</StyledItemProjectText></div>
            </StyledItemProjectInnerWrapper>
          </StyledItemProjectWrapper>
        </StyledItemCategory>
        <StyledItemCategory>
          <StyledItemDeadLineWrapper>
            <StyledItemDeadLineInnerWrapper>{field_deadline}</StyledItemDeadLineInnerWrapper>
          </StyledItemDeadLineWrapper>
        </StyledItemCategory>
        <StyledItemCategory>
          <StyledItemTagsWrapper>
            <StyledItemTagsInnerWrapper>
              <StyledItemTags>
                <StyledItemTag>{TagName}</StyledItemTag>
              </StyledItemTags>
            </StyledItemTagsInnerWrapper>
          </StyledItemTagsWrapper>
        </StyledItemCategory>
      </StyledItemCategorys>
    </StyledCard>
    <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
      {modalContent}
    </Modal>
    </>
  )
}

const StyledCard = styled.div`
  display: block; color: inherit; text-decoration: none; user-select: none; transition: background 100ms ease-out 0s; cursor: pointer; box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 2px 4px; border-radius: 4px; background: white; overflow: hidden; margin-bottom: 5px; position: static; height: 100%; min-height: 40px;
`;

const StyledItemTitle = styled.div`
display: flex; padding: 8px 10px 6px 6px; position: relative;
`;

const StyledItemTitleWrapper = styled.div`
max-width: 100%; width: auto; white-space: pre-wrap; word-break: break-word; caret-color: rgb(55, 53, 47); font-size: 14px; line-height: 1.5; min-height: 21px; font-weight: 500; flex-grow: 1; padding: 2px; pointer-events: none;
`;

const StyledItemCategorys = styled.div`
padding-top: 0px; padding-bottom: 4px; line-height: 1.5; display: flex; flex-direction: column;
`;

const StyledItemCategory = styled.div`
user-select: none; transition: background 20ms ease-in 0s; cursor: pointer; position: relative; display: flex; overflow: hidden; align-items: center; border-radius: 5px; font-size: 12px; margin: 0px 6px 2px; padding: 5px; min-height: 28px; white-space: normal; width: fit-content;
`;

const StyledItemProjectWrapper = styled.div`
display: flex; flex-wrap: wrap; gap: 4px 6px;
`;

const StyledItemProjectInnerWrapper = styled.div`
display: inline; line-height: 1.5; border-radius: 3px; font-size: 12px; font-weight: 500; min-width: auto; margin: 0px;
`;

const StyledItemProjectText = styled.span`
background-image: linear-gradient(to right, rgba(55, 53, 47, 0.16) 0%, rgba(55, 53, 47, 0.16) 100%); background-repeat: repeat-x; background-position: 0px 100%; background-size: 100% 1px;
`;

const StyledItemDeadLineWrapper = styled.div`
line-height: 1.5; white-space: pre-wrap; word-break: break-word;
`;

const StyledItemDeadLineInnerWrapper = styled.div`
line-height: 1.5; white-space: pre-wrap; word-break: break-word; display: inline;
`;

const StyledItemTagsWrapper = styled.div`
display: flex; flex-wrap: wrap; gap: 4px 6px;
`;

const StyledItemTagsInnerWrapper = styled.div`
display: flex; align-items: center; flex-shrink: 0; min-width: 0px; max-width: 100%; height: 18px; border-radius: 3px; padding-left: 6px; padding-right: 6px; font-size: 12px; line-height: 120%; color: rgb(76, 35, 55); background: rgb(245, 224, 233); margin: 0px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
`;

const StyledItemTags = styled.div`
white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: inline-flex; align-items: center; height: 18px; line-height: 18px;
`;

const StyledItemTag = styled.div`
white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
`;




export default Card;
