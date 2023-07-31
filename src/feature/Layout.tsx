import { createGlobalStyle, styled } from "styled-components";
import { Outlet } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { Suspense } from "react";
import NavBar from "./NavBar";
import reset from "styled-reset";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer
      />
      <ContentWrapper>
        <NavBar />
        <Suspense fallback={<Oval />}>
          <div>
            <Outlet />
          </div>
        </Suspense>
      </ContentWrapper>
    </>
  )


};

const ContentWrapper = styled.div`
display: flex;
align-items: start;
column-gap: 16px;
width: 800px;
padding: 20px;
border-radius: 8px;
background-color: #ffffff;
box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

export default Layout;
