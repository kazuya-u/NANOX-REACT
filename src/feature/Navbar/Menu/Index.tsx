import styled from "styled-components";
import Items from "./Items/Index";
import Profile from "./Profile/Index";

export default function Menu() {
  return (
    <StyledMenu>
      <Profile />
      <Items />
    </StyledMenu>
  )
}

const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;
`;
