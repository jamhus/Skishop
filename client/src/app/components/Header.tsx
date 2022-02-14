import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, NavLink } from "react-router-dom";
import { Badge, List, ListItem, Switch } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useAppSelector } from "../store/configureStore";

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

const Header = ({ switchTheme }: Props) => {
  const { basket } = useAppSelector(state => state.basket);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
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
  const itemsInBasket = basket?.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <AppBar position="static"  sx={{ mb: 4 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* logo and toggle on big screen */}

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
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

          {/* menu on little screen */}

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {midLinks.map(({ title, path }) => (
                <MenuItem component={NavLink} to={path} key={path}>
                  {title.toUpperCase()}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* logo and toggle on little screen */}

          <Box
            alignItems="center"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
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
          {/* menu on big screen */}

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <List sx={{ display: "flex" }}>
              {midLinks.map(({ title, path }) => (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyle}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>
          </Box>

          {/* right side */}
          <Box display="flex" alignItems="center">
            <IconButton
              component={Link}
              to="/basket"
              size="large"
              sx={navStyle}
            >
              <Badge badgeContent={itemsInBasket} color="secondary">
                <ShoppingCart></ShoppingCart>
              </Badge>
            </IconButton>
            <Tooltip title="">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{marginLeft:"10px"}} alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            {/* login and register for small displays */}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {rightLinks.map(({ title, path }) => (
                <MenuItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyle}
                >
                  {title.toUpperCase()}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
