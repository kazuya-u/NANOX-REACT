import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

type NavHiddenProps = {
  hidden?: boolean
}

const NavBar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  if (currentPath === '/login') {
    return (
      <>
        <SidebarWrapper>
          <SidebarHeader>Menu</SidebarHeader>
          <SideMenuWrapper>
            <SidebarItem>
              <Link to={"/"}>Home</Link>
            </SidebarItem>
            <SidebarItem>
              <Link to={"/tasks"}>Tasks</Link>
            </SidebarItem>
            <SidebarItem>
              <Link to={"/about"}>About</Link>
            </SidebarItem>
            <SidebarItem>
              <Link to={"/contact"}>Contact</Link>
            </SidebarItem>
            <SidebarItem>
              <Link to={"/login"}>Login</Link>
            </SidebarItem>
            <SidebarItem>
              <Link to={"/poc-context"}>Contextの勉強</Link>
            </SidebarItem>
          </SideMenuWrapper>
        </SidebarWrapper>
      </>
    );
  }
  else {
    return (
      <>
        <SidebarWrapper>
          <SidebarHeader>Menu</SidebarHeader>
          <SideMenuWrapper>
            <SidebarItem>
              <Link to={"/"}>Home</Link>
            </SidebarItem>
            <SidebarItem>
              <Link to={"/tasks"}>Tasks</Link>
            </SidebarItem>
            <SidebarItem>
              <Link to={"/about"}>About</Link>
            </SidebarItem>
            <SidebarItem>
              <Link to={"/contact"}>Contact</Link>
            </SidebarItem>
            <SidebarItem>
              <Link to={"/login"}>Login</Link>
            </SidebarItem>
            <SidebarItem>
              <Link to={"/poc-context"}>Contextの勉強</Link>
            </SidebarItem>
          </SideMenuWrapper>
        </SidebarWrapper>
      </>
    );
  }


};

const SidebarWrapper = styled.div`
  background-color: #f7f7f7;
  width: 200px;
  padding: 20px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

const SidebarHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const SideMenuWrapper = styled.ul<NavHiddenProps>`
  display: ${({ hidden }) => hidden ? 'none' : 'block'} ;
  list-style: none;
  padding: 0;
`;

const SidebarItem = styled.li`
  margin-bottom: 10px;

  a {
    text-decoration: none;
    color: #333;
    font-size: 1.1rem;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: #007bff;
    }
  }
`;

export default NavBar