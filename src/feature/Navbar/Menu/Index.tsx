import styled from "styled-components";
import Items from "./Items/Index";

export default function Menu() {
  return (
    <StyledMenu>
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
