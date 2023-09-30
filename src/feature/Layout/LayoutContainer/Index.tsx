import { Outlet } from "react-router-dom";
import Navbar from "../../Navbar/Index";
import styled from "styled-components";

const LayoutContainer: React.FC = () => {
  return (
    <>
      <StyledContainer>
        <StyledInner>
          <StyledInnerWrapper>
            <StyledListner>
              <Navbar />
              <Outlet />
            </StyledListner>
          </StyledInnerWrapper>
        </StyledInner>
      </StyledContainer>
    </>
  );
};

const StyledContainer = styled.div`
  overflow: hidden;
  position: relative;
  height: 100vh;
`;

const StyledInner = styled.div`
  color: #37352f;
  fill: currentcolor;
  line-height: 1.5;
  font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Hiragino Sans GB", メイリオ, Meiryo, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
  -webkit-font-smoothing: auto;
  background-color: #fff;
`;

const StyledInnerWrapper = styled.div`
  height: 100%;
`;

const StyledListner = styled.div`
  width: 100vw;
  height: 100%;
  position: relative;
  display: flex;
  flex: 1 1 0%;
  background: white;
  cursor: text;
`;

export default LayoutContainer;
