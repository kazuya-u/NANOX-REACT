import { useModal } from "../feature/Modal/utils/useModal";
import Modal from "../feature/Modal/Modal";
import TaskForm from "../feature/TaskForm/TaskForm";

const CreateContent: React.FC = () => {
  const { isOpen, modalContent, openModal, closeModal } = useModal();
  
  return (
    <>
      <div>
        <button onClick={() => openModal(<TaskForm onClose={closeModal} />)}>
          タスク追加
        </button>
        <Modal isOpen={isOpen} onRequestClose={closeModal}>
          {modalContent}
        </Modal>
      </div>
    </>
  );
};

export default CreateContent;
