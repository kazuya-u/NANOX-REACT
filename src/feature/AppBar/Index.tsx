import { useContext } from "react";
import { menuContext } from "../Drawer/Index";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const MyAppBar: React.FC = () => {
  const { isOpened, setOpened } = useContext(menuContext);
  const toggleOpen = () => setOpened(!isOpened);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default MyAppBar;
