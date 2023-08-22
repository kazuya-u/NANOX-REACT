import Stack from "@mui/material/Stack";
import {
  Divider,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { Link } from 'react-router-dom';
import { GoBook, GoHome, GoPerson, GoQuestion, GoTasklist } from "react-icons/go";
import styled from "styled-components";

export default function Navbar() {
  return (
    <Stack spacing={1}>
      <Divider />
      <ul>
        <StyledListItem>
          <StyledLink to="/">
            <ListItemButton>
              <ListItemIcon>
                <GoHome size={24} />
              </ListItemIcon>
              <div>Home</div>
            </ListItemButton>
          </StyledLink>
        </StyledListItem>
        <StyledListItem>
          <StyledLink to="tasks">
            <ListItemButton>
              <ListItemIcon>
                <GoTasklist size={24} />
              </ListItemIcon>
              <div>Task</div>
            </ListItemButton>
          </StyledLink>
        </StyledListItem>
        <StyledListItem>
          <StyledLink to="notes">
            <ListItemButton>
              <ListItemIcon>
                <GoBook size={24} />
              </ListItemIcon>
              <div>Note</div>
            </ListItemButton>
          </StyledLink>
        </StyledListItem>
        <StyledListItem>
          <StyledLink to="/about">
            <ListItemButton>
              <ListItemIcon>
                <GoPerson size={24} />
              </ListItemIcon>
              <div>About</div>
            </ListItemButton>
          </StyledLink>
        </StyledListItem>
        <StyledListItem>
          <StyledLink to="/contact">
            <ListItemButton>
              <ListItemIcon>
                <GoQuestion size={24} />
              </ListItemIcon>
              <div>Contact</div>
            </ListItemButton>
          </StyledLink>
        </StyledListItem>
      </ul>
    </Stack>
  );
}

const StyledListItem = styled.li`
width: 100%;
text-decoration: none;
text-align: left;
list-style: none;
`;

const StyledLink = styled(Link)`
align-items: center;
justify-content: center;
position: relative;
padding: 8px 16px;
cursor: pointer;

vertical-align: middle;
color: inherit;
display: -webkit-box;
display: -webkit-flex;
display: -ms-flexbox;
display: flex;

flex-grow: 1;

justify-content: flex-start;

align-items: center;
position: relative;
text-decoration: none;
min-width: 0;
text-align: left;
padding-top: 8px;
padding-bottom: 8px;
transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
padding-left: 16px;
padding-right: 16px;
`;
