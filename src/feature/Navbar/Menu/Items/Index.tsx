import styled from "styled-components";
import Header from "./Header";
import List from "./List";

export default function Items() {
  return (
    <StyledItems>
      <StyledItemsContainer>
        <StyledHeader>
          <Header />
        </StyledHeader>
        <StyledList>
          <List />
        </StyledList>
      </StyledItemsContainer>
    </StyledItems>
  )
}

const StyledItems = styled.div`
  z-index: 1;
  padding-top: 6px;
  padding-bottom: 20px;
  overflow: hidden auto;
  margin-right: 0px;
  margin-bottom: 0px;
`;

const StyledItemsContainer = styled.div`
  margin-bottom: 18px;
  width: 100%;
`;
const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 14px;
  min-height: 24px;
  padding: 0px 14px 0px 15px;
  margin-top: 6px;
  margin-bottom: 2px;
`;

const StyledList = styled.div`
  display: block;
`;
