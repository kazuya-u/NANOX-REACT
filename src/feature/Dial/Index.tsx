import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { GoBook, GoTasklist } from "react-icons/go";
import Modal from "../Modal/Index";
import { useModal } from "../Modal/utils/useModal";
import TaskForm from "../Task/Post/Index";
import NoteForm from "../Note/Post/Index";
const actions = [
  { icon: <GoBook />, name: "Note", form: <NoteForm /> },
  { icon: <GoTasklist />, name: "Task", form: <TaskForm /> },
];

const Dial: React.FC = () => {
  const { isModalOpen, openModal, closeModal, modalContent } = useModal();
  return (
    <Box sx=
      {{
        height: 320,
        transform: "translateZ(0px)",
        flexGrow: 1,
        position: "fixed",
        right: 24,
        bottom: 24,
      }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => openModal(action.form)}
        />
        ))}
      </SpeedDial>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
              {modalContent}
      </Modal>
    </Box>
  );
};

export default Dial;
