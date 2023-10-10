import styled from "styled-components";

interface props {
  status: string,
}

const NavItem: React.FC<props> = ({ status }) => {
  return (
    <>
      <StyledNavItem>
        <StyledContainer>
          <StyledWrapper>
          <StyledInnerWrapper_1>
            <StyledInnerWrapper_2>
              <StyledInnerWrapper_3>
                <StyledInnerWrapper_4>
                  {status}
                </StyledInnerWrapper_4>
              </StyledInnerWrapper_3>
            </StyledInnerWrapper_2>
          </StyledInnerWrapper_1>
          </StyledWrapper>
        </StyledContainer>
      </StyledNavItem>
    </>
  )
}

const StyledNavItem = styled.div`
display: flex; flex-direction: row;
`;

const StyledContainer = styled.div`
  display: flex; align-items: center; font-size: 14px; width: 260px; padding-left: 5px; padding-right: 5px; margin-right: 10px; margin-bottom: 0px; box-sizing: content-box; flex-shrink: 0; cursor: pointer;
`;

const StyledWrapper = styled.div`
width: 100%; max-width: 100%; margin-top: 1px; margin-bottom: 1px;
`;

const StyledInnerWrapper_1 = styled.div`
user-select: none; transition: background 20ms ease-in 0s; cursor: pointer; overflow: hidden; padding: 3px 6px 3px 3px; border-radius: 3px; font-weight: 500; max-width: 190px;
`;

const StyledInnerWrapper_2 = styled.div`
display: inline-flex; align-items: center; flex-shrink: 1; min-width: 0px; max-width: 100%; height: 20px; border-radius: 3px; padding-left: 6px; padding-right: 6px; font-size: 14px; line-height: 120%; color: rgb(50, 48, 44); background: rgba(227, 226, 224, 0.5); margin: 0px;
`;

const StyledInnerWrapper_3 = styled.div`
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: inline-flex; align-items: center; height: 20px; line-height: 20px;
`;

const StyledInnerWrapper_4 = styled.div`
white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
`;


export default NavItem;
