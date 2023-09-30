import styled from "styled-components";
import Menu from "../Menu/Index";

export default function Layout() {
  return (
    <>
      <StyledNavbar>
        <StyledNavbarContainer>
          <StyledNavbarInner>
            <StyledNavbarInnerWrapper>
              <StyledNavbarWrapper>
                <Menu />
              </StyledNavbarWrapper>
            </StyledNavbarInnerWrapper>
          </StyledNavbarInner>
        </StyledNavbarContainer>
      </StyledNavbar>
    </>
  );
}

const StyledNavbar = styled.nav`
    flex-grow: 0;
    flex-shrink: 0;
    pointer-events: none;
    position: relative;
    z-index: 111;
    background: rgb(251, 251, 250);
    transition: width 270ms ease 0s;
    box-shadow: rgba(0, 0, 0, 0.024) -1px 0px 0px 0px inset;
    width: 220px;
`;

const StyledNavbarContainer = styled.div`
  color: #19171199;
  font-weight: 500;
  height: 100%;
`;

const StyledNavbarInner = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  width: 0px;
  overflow: visible;
  z-index: 9;
  pointer-events: none;
`;

const StyledNavbarInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  pointer-events: auto;
  visibility: visible;
  width: 220px;
  opacity: 1;
  transition-property: width, opacity, transform;
  transition-duration: 270ms;
  transition-timing-function: ease;
`;

const StyledNavbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  position: relative;
`;
