import Stack from "@mui/material/Stack";
import {
  Divider,
  ListItemButton,
} from "@mui/material";
import { Link } from 'react-router-dom';
import { GoBook, GoClock, GoHome, GoPerson, GoQuestion, GoTasklist } from "react-icons/go";
import styled from "styled-components";

export default function Navbar() {
  return (
    <Stack spacing={1}>
      <Divider />
      <ul>
        <StyledListItem>
          <StyledLink to="/">
            <ListItemButton>
              <StyledLinkIcon>
                <GoHome size={20} />
              </StyledLinkIcon>
              <StyledLinkText>Home</StyledLinkText>
            </ListItemButton>
          </StyledLink>
        </StyledListItem>
        <StyledListItem>
          <StyledLink to="tasks">
            <ListItemButton>
              <StyledLinkIcon>
                <GoTasklist size={20} />
              </StyledLinkIcon>
              <StyledLinkText>Task</StyledLinkText>
            </ListItemButton>
          </StyledLink>
        </StyledListItem>
        <StyledListItem>
          <StyledLink to="notes">
            <ListItemButton>
              <StyledLinkIcon>
                <GoBook size={20} />
              </StyledLinkIcon>
              <StyledLinkText>Note</StyledLinkText>
            </ListItemButton>
          </StyledLink>
        </StyledListItem>
        <StyledListItem>
          <StyledLink to="toggl">
            <ListItemButton>
              <StyledLinkIcon>
                <GoClock size={20} />
              </StyledLinkIcon>
              <StyledLinkText>Toggl</StyledLinkText>
            </ListItemButton>
          </StyledLink>
        </StyledListItem>
        <StyledListItem>
          <StyledLink to="/about">
            <ListItemButton>
              <StyledLinkIcon>
                <GoPerson size={20} />
              </StyledLinkIcon>
              <StyledLinkText>About</StyledLinkText>
            </ListItemButton>
          </StyledLink>
        </StyledListItem>
        <StyledListItem>
          <StyledLink to="/contact">
            <ListItemButton>
              <StyledLinkIcon>
                <GoQuestion size={20} />
              </StyledLinkIcon>
              <StyledLinkText>Contact</StyledLinkText>
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
display: flex;
align-items: center;
justify-content: center;
vertical-align: middle;
color: inherit;
flex-grow: 1;
justify-content: flex-start;
text-align: left;
padding: 8px 16px;
`;

const StyledLinkIcon = styled.div`
  min-width: 32px;
`;

const StyledLinkText = styled.div`
  font-size: 13px;
  font-weight: 700;
`
