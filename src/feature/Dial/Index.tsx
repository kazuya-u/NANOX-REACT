import { GoBook, GoTasklist } from "react-icons/go";
import { useModal } from "../Modal/utils/useModal";
import Box from "@mui/material/Box";
import Modal from "../Modal/Index";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { GetPostId } from "../Task/api/Post/PostTask";
import TaskPatchForm from "../Task/Patch/Index";

const actions = [
  { icon: <GoBook />, name: "Note", form: 'note' },
  { icon: <GoTasklist />, name: "Task", form: 'task' },
];

const Dial: React.FC = () => {
  const { isModalOpen, openModal, closeModal, modalContent } = useModal();
  async function handleActionClick(bundleType: string) {
    const id = await GetPostId();
    console.log(id);
    
    switch (bundleType) {
      case 'note':
        // 開発中...
        console.log('開発中...');
        
        break;
      case 'task':
        openModal(<TaskPatchForm id={id} />);
        break;
    }
    return;
  }
  
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
            onClick={() => handleActionClick(action.form)}
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
