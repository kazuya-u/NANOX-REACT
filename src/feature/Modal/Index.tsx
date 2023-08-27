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
    zIndex: "1202",
    backgroundColor: "#0000004b",
  },
  content: {
    borderRadius: 0,
    padding: 0,
    width: "60%",
    height: "80%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
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
