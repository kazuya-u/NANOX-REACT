import { Outlet } from "react-router-dom"
import Dial from "../../../../feature/Dial/Index";
import styled from "styled-components"

export default function Flame() {
  return (
    <>
      <StyledFlame>
        <StyledFlameContainer>
          <StyledFlameWrapper>
            <StyledFlameInner>
              <StyledFlameInnerWrapper>
                <Outlet />
              </StyledFlameInnerWrapper>
            </StyledFlameInner>
          </StyledFlameWrapper>
        </StyledFlameContainer>
      </StyledFlame>
      <StyledDial>
        <Dial />
      </StyledDial>
    </>
  )
}

const StyledFlame = styled.div`
  flex-grow: 0;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  background: white;
  z-index: 1;
  height: calc(100vh - 45px);
  max-height: 100%;
  position: relative;
  width: calc(100vw - 220px);
  transition-property: width;
  transition-duration: 270ms;
  transition-timing-function: ease;
`;


const StyledFlameContainer = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
  align-items: center;
  margin-right: 0px;
  margin-bottom: 0px;
  overflow: hidden auto;
`;

const StyledFlameWrapper = styled.div`
  margin-top: 120px;
  caret-color: rgb(55, 53, 47);
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  flex-grow: 1;
`;

const StyledFlameInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 3;
  flex-shrink: 0;
`;

const StyledFlameInnerWrapper = styled.div`
  max-width: 100%;
  min-width: 0px;
  width: 900px;
`;

const StyledDial = styled.div`
  z-index: 2;
`;
