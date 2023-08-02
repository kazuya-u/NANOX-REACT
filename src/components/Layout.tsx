import 'react-toastify/dist/ReactToastify.css';
import { createGlobalStyle, styled } from "styled-components";
import { getUserIdFromLocalStorage } from "../feature/AuthUser/utils/LocalStorageUtils";
import { Outlet } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { Suspense } from "react";
import { ToastContainer } from 'react-toastify';
import Login from "../feature/AuthUser/Login";
import NavBar from "./NavBar";
import reset from "styled-reset";

const Layout: React.FC = () => {
  const isAuth = getUserIdFromLocalStorage();
  if (isAuth == null) {
    return (
      <Login />
    )
  }
  else {
    return (
      <>
        <GlobalStyle />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
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

  }
};

const GlobalStyle = createGlobalStyle`
${reset}
*, *::after, *::before {
  box-sizing: border-box;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}
`;

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
