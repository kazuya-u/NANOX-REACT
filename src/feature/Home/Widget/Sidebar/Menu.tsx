import { GoFileCode } from "react-icons/go";
import styled from "styled-components";

const Menu: React.FC = () => {
  return (
    <>
      <StyledMenu>
        <StyledMenuContainer>
          <StyledMenuContainerWrapper>
            <StyledMenuWrapper>
              <StyledMenuInnerWrapper>
                <StyledMenuInner>
                  <StyledMenuInnerInner>
                    <StyledMenuIcon>
                      <StyledMenuIconWrapper>
                        <GoFileCode />
                      </StyledMenuIconWrapper>
                    </StyledMenuIcon>
                    <StyledMenuText>
                      Nintendo
                    </StyledMenuText>
                  </StyledMenuInnerInner>
                </StyledMenuInner>
              </StyledMenuInnerWrapper>
            </StyledMenuWrapper>
          </StyledMenuContainerWrapper>
        </StyledMenuContainer>
        
      </StyledMenu>
    </>
  )
}

const StyledMenu = styled.div`
  width: 100%; max-width: 100%; margin-top: 1px; margin-bottom: 1px;
`;

const StyledMenuContainer = styled.div`
  user-select: none; --pseudoSelection--background: transparent;
`;

const StyledMenuContainerWrapper = styled.div`
  display: block; color: inherit; text-decoration: none; user-select: none; transition: background 20ms ease-in 0s; cursor: pointer; fill: inherit;
`;

const StyledMenuWrapper = styled.div`
display: flex; align-items: center; width: 100%;
`;

const StyledMenuInnerWrapper = styled.div`
display: flex; align-items: center; width: 100%;
`;

const StyledMenuInner = styled.div`
flex: 1 1 0px; min-width: 1px; padding-top: 3px; padding-bottom: 3px; padding-left: 2px;
`;

const StyledMenuInnerInner = styled.div`
display: flex; align-items: center;
`;

const StyledMenuIcon = styled.div`
position: relative; width: 24px; height: 24px; margin-right: 4px;
`;

const StyledMenuIconWrapper = styled.div`
user-select: none; transition: background 20ms ease-in 0s; cursor: pointer; display: flex; align-items: center; justify-content: center; height: 100%; width: 100%; border-radius: 0.25em; flex-shrink: 0;
`;

const StyledMenuText = styled.div`
white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 500; line-height: 1.3; border-bottom: 1px solid rgba(55, 53, 47, 0.16);
`;

export default Menu;
