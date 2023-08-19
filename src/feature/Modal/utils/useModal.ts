import { useState } from 'react';

interface ModalProps {
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

export const useModal = (): ModalProps => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

  const openModal = (content: React.ReactNode) => {
    setIsModalOpen(true);
    setModalContent(content);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return { isModalOpen, modalContent, openModal, closeModal };
};
