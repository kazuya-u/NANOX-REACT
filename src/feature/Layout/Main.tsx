import { GoPlus, GoSidebarExpand } from "react-icons/go";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material";
import { useModal } from "../Modal/utils/useModal";
import { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Modal from "../Modal/Index";
import NavBar from "../Drawer/NavBar";
import TaskForm from "../Task/Post/Index";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  marginLeft: -288,
  paddingLeft: 48,
  paddingRight: 48,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.leavingScreen,
  }),
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
        <Header
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
              onClick={() => openModal(<TaskForm />)}
            >
              <GoPlus size={16} />
            </AddContentButton>
            <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
              {modalContent}
            </Modal>
          </Toolbar>
        </Header>
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
          <MainWrapper>
            <Outlet />
          </MainWrapper>
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

const Toolbar = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 24px;
  padding-right: 24px;
  min-height: 48px;
`;

const MainWrapper = styled("div")`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled("header")`
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-shrink: 0;
  position: fixed;
  z-index: 1100;
  top: 0;
  left: auto;
  right: 0;
  background-color: #f0841a;
  color: #fff;
  z-index: 1201;
`;

export default MainContent;
