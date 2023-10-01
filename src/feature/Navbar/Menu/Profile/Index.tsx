import styled from "styled-components"
import UserIcon from "./UserIcon";
import UserName from "./UserName";

export default function Profile() {
  return (
    <StyledProfile>
      <StyledContainer>
        <StyledWrapper>
            <UserIcon />
            <UserName />
        </StyledWrapper>
      </StyledContainer>
    </StyledProfile>
  )
}

const StyledProfile = styled.div`
  display: block;
  flex-shrink: 0;
  flex-grow: 0;
`;

const StyledContainer = styled.div`
  user-select: none;
  transition: background 20ms ease-in 0s;
  cursor: pointer;
  display: flex;
  align-items: center;
  min-width: 0px;
  height: 45px;
  width: 100%;
  margin-bottom: 0px;
  padding: 0px;
  :hover {
    user-select: none;transition: background 20ms ease-in 0s;cursor: pointer;display: flex;align-items: center;min-width: 0px;height: 45px;width: 100%;margin-bottom: 0px;padding: 0px;background: rgba(55, 53, 47, 0.08);box-shadow: rgba(35, 131, 226, 0.57) 0px 0px 0px 1px inset, rgba(35, 131, 226, 0.35) 0px 0px 0px 2px;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 14px;
  min-height: 27px;
  padding: 2px 14px;
  margin-top: 1px;
  margin-bottom: 1px;
  overflow: hidden;
  margin-left: 0px;
`;
