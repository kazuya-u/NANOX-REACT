import styled from "styled-components";
import Indify from "../Widget/Indify/Index";
import Task from "../Widget/Task/Index";
import Sidebar from "../Widget/Sidebar/Index";
import Gap from "../Gap";

const Layout: React.FC = () => {
  return (
    <>
      <StylyedIndify>
        <StyledIndifyContainer>
          <Indify />
        </StyledIndifyContainer>
      </StylyedIndify>
      <StyledDocContainer>
        <StyledDocWrapper>
          <StyledMemoWrapper>
            <Sidebar />
          </StyledMemoWrapper>
          <Gap />
          <StyledTaskWrapper>
            <Task />
          </StyledTaskWrapper>
        </StyledDocWrapper>
      </StyledDocContainer>
      <div>
        <div>
          <div>
            <div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const StylyedIndify = styled.div`
  width: 100%;
  max-width: 912px;
  align-self: center;
  margin-top: 2px;
  margin-bottom: 1px;
`;

const StyledIndifyContainer = styled.div`
  display: flex;
`;

const StyledDocContainer = styled.div`
width: 100%; align-self: center; margin-top: 1px; margin-bottom: 0px;
`;

const StyledDocWrapper = styled.div`
display: flex;
`;

const StyledMemoWrapper = styled.div`
padding-top: 12px; padding-bottom: 12px; flex-grow: 0; flex-shrink: 0; width: calc((100% - 46px) * 0.25);
`;

const StyledTaskWrapper = styled.div`
padding-top: 12px; padding-bottom: 12px; flex-grow: 0; flex-shrink: 0; width: calc((100% - 46px) * 0.75);
`;

export default Layout;
