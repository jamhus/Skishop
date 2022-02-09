import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

interface Props {
  switchTheme: () => void;
}

const midLinks = [
  { title: "Catalog", path: "/catalog" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

const rightLinks = [
  { title: "Login", path: "/login" },
  { title: "Register", path: "/Register" },
];

const navStyle = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&.active": {
    color: "text.secondary",
  },
  "&:hover": {
    color: "grey.300",
  },
};
const Header = ({ switchTheme }: Props) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            exact
            sx={navStyle}
          >
            SKISHOP
          </Typography>
          <Switch {...label} onChange={switchTheme} />
        </Box>
        
        <List sx={{ display: "flex" }}>
          {midLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={navStyle}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box display="flex" alignItems="center">
          <IconButton size="large" sx={navStyle}>
            <Badge badgeContent={4} color="secondary">
              <ShoppingCart></ShoppingCart>
            </Badge>
          </IconButton>
          <List sx={{ display: "flex" }}>
            {rightLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyle}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Header;
