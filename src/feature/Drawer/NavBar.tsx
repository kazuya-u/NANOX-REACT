import Stack from "@mui/material/Stack";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from 'react-router-dom';
import { GoHome, GoPerson, GoQuestion, GoTasklist } from "react-icons/go";

export default function Navbar() {
  return (
    <Stack spacing={1}>
      <Divider />
      <List>
        <ListItem component={Link} to="/">
          <ListItemButton>
            <ListItemIcon>
              <GoHome size={24} />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem component={Link} to="tasks">
          <ListItemButton>
            <ListItemIcon>
              <GoTasklist size={24} />
            </ListItemIcon>
            <ListItemText>Tasks</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem component={Link} to="/about">
          <ListItemButton>
            <ListItemIcon>
              <GoPerson size={24} />
            </ListItemIcon>
            <ListItemText>About</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem component={Link} to="/contact">
          <ListItemButton>
            <ListItemIcon>
              <GoQuestion size={24} />
            </ListItemIcon>
            <ListItemText>Contact</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Stack>
  );
}
