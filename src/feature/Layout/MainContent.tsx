import { useState, useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import NavBar from '../Drawer/NavBar';
import { useModal } from '../Modal/utils/useModal';
import TaskForm from '../Task/Post/Index';
import { GoPlus } from 'react-icons/go';
import Modal from '../Modal/Index';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: -250,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

function MainContent() {
  const [isOpen, setOpenState] = useState<boolean>(true);
  const toggleOpenState = useCallback(() => {
    setOpenState(prevOpenState => !prevOpenState);
  }, []);
  const { isModalOpen, openModal, closeModal, modalContent } = useModal();

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={toggleOpenState}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <AddContentButton onClick={() => openModal(<TaskForm onClose={closeModal} />)}>
            <GoPlus size={16} color={"#0e1116"} />
          </AddContentButton>
          <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
            {modalContent}
          </Modal>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
          },
        }}
        variant="persistent"
        anchor="left"
        open={isOpen}
      >
        <Toolbar />
        <NavBar />
      </Drawer>

      <Main open={isOpen}>
        <Toolbar />
        <Outlet />
      </Main>
    </Box>
  );
}

const AddContentButton = styled('button')`
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

export default MainContent;
