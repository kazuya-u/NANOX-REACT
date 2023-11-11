import styled from "styled-components";
import List from "./List";

const Index: React.FC = () => {
  return (
    <>
      <StyledList>
        <StyledListWrapper>
          <StyledListInner>
            <StyledListInnerWrapper>
              <List />
            </StyledListInnerWrapper>
          </StyledListInner>
        </StyledListWrapper>
        
      </StyledList>
    </>
  );
};

const StyledList = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const StyledListWrapper = styled.div`
  z-index: 1;
  flex-grow: 1;
  flex-shrink: 0;
  margin-right: 0px;
  margin-bottom: 0px;
`;
const StyledListInner = styled.div`
  position: relative;
  float: left;
  min-width: 100%;
  user-select: none;
  font-variant-numeric: lining-nums tabular-nums;
  padding-bottom: 180px;
  padding-left: 96px;
  padding-right: 96px;
`;
const StyledListInnerWrapper = styled.div`
  position: relative;
`;

export default Index;
