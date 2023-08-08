import React from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

const style = {
  overlay: {
    zIndex: "100",
    backgroundColor: "#0000004b",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
  },
};

const Modal: React.FC<ModalProps> = ({ isOpen, onRequestClose, children }) => {
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} style={style}>
      {children}
    </ReactModal>
  );
};

export default Modal;
