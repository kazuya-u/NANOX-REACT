import { Link as RouterLink } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import * as React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const LinkBehavior = React.forwardRef((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return (
    <RouterLink data-testid="custom-link" ref={ref} to={href} {...other} />
  );
});

LinkBehavior.propTypes = {
  href: PropTypes.oneOfType([
    PropTypes.shape({
      hash: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string,
    }),
    PropTypes.string,
  ]).isRequired,
};

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});

export default function Navbar() {
  return (
    <Stack sx={{ typography: "body1" }} alignItems="center" spacing={1}>
      <ThemeProvider theme={theme}>
        <Divider />
        <List>
          <ListItem>
            
            <Link href="/">
              <ListItemButton>
                <ListItemIcon>
                  <MenuIcon />
                </ListItemIcon>
                <ListItemText>Home</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/tasks">
              <ListItemButton>
                <ListItemIcon>
                  <MenuIcon />
                </ListItemIcon>
                <ListItemText>Tasks</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/about">
              <ListItemButton>
                <ListItemIcon>
                  <MenuIcon />
                </ListItemIcon>
                <ListItemText>About</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/contact">
              <ListItemButton>
                <ListItemIcon>
                  <MenuIcon />
                </ListItemIcon>
                <ListItemText>Contact</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/login">
              <ListItemButton>
                <ListItemIcon>
                  <MenuIcon />
                </ListItemIcon>
                <ListItemText>Login</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
        <Divider />
      </ThemeProvider>
    </Stack>
  );
}

// const NavBar: React.FC = () => {
//   return (
//     <>
//       <Divider />
//       <List components={RouterLink}>
//         {['Home', 'Tasks', 'About', 'Contact', 'Login'].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <div>

//       </div>
//     </>
//   );
// };

// const SidebarWrapper = styled.div`
//   background-color: #f7f7f7;
//   width: 200px;
//   padding: 20px;
//   box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
// `;

// const SidebarHeader = styled.h2`
//   font-size: 1.5rem;
//   font-weight: bold;
//   margin-bottom: 20px;
// `;

// const SideMenuWrapper = styled.ul<NavHiddenProps>`
//   display: ${({ hidden }) => hidden ? 'none' : 'block'} ;
//   list-style: none;
//   padding: 0;
// `;

// const SidebarItem = styled.li`
//   margin-bottom: 10px;

//   a {
//     text-decoration: none;
//     color: #333;
//     font-size: 1.1rem;
//     transition: color 0.2s ease-in-out;

//     &:hover {
//       color: #007bff;
//     }
//   }
// `;
