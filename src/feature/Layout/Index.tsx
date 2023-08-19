import "react-toastify/dist/ReactToastify.css";
import { getUserIdFromLocalStorage } from "../AuthUser/utils/LocalStorageUtils";
import { GoPlus } from "react-icons/go";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import { useModal } from "../Modal/utils/useModal";
import Login from "../AuthUser/Login";
import Modal from "../Modal/Index";
import TaskForm from "../Task/Post/Index";
import MainContent from "./MainContent";

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
        <div>
          <AddContentButton onClick={() => openModal(<TaskForm onClose={closeModal} />)}>
            <GoPlus size={16} color={"#0e1116"} />
          </AddContentButton>
          <Modal isOpen={isOpen} onRequestClose={closeModal}>
            {modalContent}
          </Modal>
        </div>
        <MainContent />
      </>
    );
  }
};


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
