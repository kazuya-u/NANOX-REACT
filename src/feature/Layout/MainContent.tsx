import { Box, CssBaseline, styled } from "@mui/material";
import { menuContext } from "../Drawer/Index";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import MyAppBar from "../AppBar/Index";
import NavBar from "../Drawer/NavBar";

const MainContent: React.FC = () => {
  const [isOpened, setOpened] = useState(true);

  return (
    <menuContext.Provider value={{ isOpened, setOpened }}>
      <Box sx={{ display: "flex" }}>
      <CssBaseline />
        {/* AppBar */}
        <MyAppBar />
        <NavBar open={isOpened} />
        {/* Main */}
        <Main open={isOpened}>
          <Outlet />
          <div>メイン</div>
        </Main>
      </Box>
    </menuContext.Provider>

  );
}

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: -250,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export default MainContent;
