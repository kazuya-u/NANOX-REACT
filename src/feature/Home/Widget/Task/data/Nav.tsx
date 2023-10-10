import styled from "styled-components";
import NavItem from "./NavItem";

type StatusArray = {
  StatusArray: string[];
}

const Nav: React.FC<StatusArray> = ({ StatusArray }) => {
  return (
    <>
      <StyledNav>
        <StyledWrapper>
          {StatusArray.map((item) => (
            <NavItem key={item} status={item} />
          ))}
        </StyledWrapper>
      </StyledNav>
    </>
  )
}

const StyledNav = styled.div`
  position: absolute;
  background: white;
  height: 42px;
  padding-top: 8px;
  z-index: 85;
  display: flex;
  box-shadow: white -3px 0px 0px;
  min-width: 100%;
`;

const StyledWrapper = styled.div`
  display: inline-flex;
  margin: 0px;
`;


export default Nav;
