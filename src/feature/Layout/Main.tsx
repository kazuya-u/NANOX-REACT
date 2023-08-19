import { useState, useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import {styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "../Drawer/NavBar";
import { useModal } from "../Modal/utils/useModal";
import TaskForm from "../Task/Post/Index";
import { GoPlus, GoSidebarExpand } from "react-icons/go";
import Modal from "../Modal/Index";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  paddingLeft: 48,
  paddingRight: 48,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: -288,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

function MainContent() {
  const [isOpen, setOpenState] = useState<boolean>(true);
  const toggleOpenState = useCallback(() => {
    setOpenState((prevOpenState) => !prevOpenState);
  }, []);
  const { isModalOpen, openModal, closeModal, modalContent } = useModal();

  return (
    <>
        <Box sx={{ display: "flex" }}>
          <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={toggleOpenState}
                sx={{ mr: 2 }}
              >
                <GoSidebarExpand />
              </IconButton>
              <AddContentButton
                onClick={() => openModal(<TaskForm onClose={closeModal} />)}
              >
                <GoPlus size={16} />
              </AddContentButton>
              <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
                {modalContent}
              </Modal>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: 288,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: 288,
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
            <MainWrapper><Outlet /></MainWrapper>
          </Main>
        </Box>
    </>
  );
}

const AddContentButton = styled("button")`
  width: 32px;
  height: 32px;
  display: grid;
  grid-auto-columns: max-content;
  justify-content: center;
  align-items: center;
  border: 1px solid #fff;
  border-radius: 6px;
`;

const Toolbar = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 24px;
  padding-right: 24px;
  min-height: 48px;
`;

const MainWrapper = styled('div')`
  max-width: 800px;
  margin: 0 auto;
`;

export default MainContent;
