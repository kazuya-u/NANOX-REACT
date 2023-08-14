import "react-toastify/dist/ReactToastify.css";
import { getUserIdFromLocalStorage } from "../../feature/AuthUser/utils/LocalStorageUtils";
import { GoPlus } from "react-icons/go";
import { Outlet } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { styled } from "styled-components";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { useModal } from "../../feature/Modal/utils/useModal";
import Login from "../../feature/AuthUser/Login";
import Modal from "../Modal/Index";
import NavBar from "./NavBar";
import TaskForm from "../Task/Post/TaskForm";

const Layout: React.FC = () => {
  const isAuth = getUserIdFromLocalStorage();
  const { isOpen, modalContent, openModal, closeModal } = useModal();
  if (isAuth == null) {
    return <Login />;
  } else {
    return (
      <>
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
              <div>
                <AddContentButton onClick={() => openModal(<TaskForm onClose={closeModal} />)}>
                  <GoPlus size={16} color={"#0e1116"} />
                </AddContentButton>
                <Modal isOpen={isOpen} onRequestClose={closeModal}>
                  {modalContent}
                </Modal>
              </div>
              <Outlet />
            </div>
          </Suspense>
        </ContentWrapper>
      </>
    );
  }
};

const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: start;
  column-gap: 16px;
  width: 1000px;
  padding: 20px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;
const AddContentButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  display: grid;
  grid-auto-columns: max-content;
  justify-content: center;
  align-items: center;
  border: 1px solid #20252c;  
  border-radius: 6px;
`;

export default Layout;
