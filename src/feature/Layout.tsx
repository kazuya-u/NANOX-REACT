import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import reset from "styled-reset";
import { createGlobalStyle, styled } from "styled-components";

const Layout: React.FC = () => {
  const GlobalStyle = createGlobalStyle`
  ${reset}
  *, *::after, *::before {
    box-sizing: border-box;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }
`;

  return (
    <>
      <GlobalStyle />
      <ContentWrapper>
        <NavBar />
        <div>
          <Outlet />
        </div>
      </ContentWrapper>
    </>
  )
};

const ContentWrapper = styled.div`
display: flex;
width: 800px;
margin: 20px;
padding: 20px;
background-color: #ffffff;
box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

export default Layout;
