import styled from "styled-components";
import Header from "../../Header";
import Menu from "./Menu";

const Index: React.FC = () => {
  return (
    <>
      <StyledSidebar>
        <Header title="Nav" />
        <Menu />
      </StyledSidebar>
    </>
  )
}

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Index;
