import { Link, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

type NavHiddenProps = {
  hidden?: boolean
}

const SideMenuWrapper = styled.ul<NavHiddenProps>`
display: ${({ hidden }) => hidden ? 'none' : 'block'} ;
`;

const Root: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  if (currentPath === '/login') {
    return (
      <>
        <SideMenuWrapper hidden>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/posts"}>Posts</Link>
          </li>
          <li>
            <Link to={"/about"}>About</Link>
          </li>
          <li>
            <Link to={"/contact"}>Contact</Link>
          </li>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
        </SideMenuWrapper>
        <Outlet />
      </>
    );
  }
  else {
    return (
      <>
        <SideMenuWrapper>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/posts"}>Posts</Link>
          </li>
          <li>
            <Link to={"/about"}>About</Link>
          </li>
          <li>
            <Link to={"/contact"}>Contact</Link>
          </li>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
        </SideMenuWrapper>
        <Outlet />
      </>
    );
  }
  

};

export default Root