import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
  switchTheme: () => void;
}
const Header = ({ switchTheme }: Props) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Switch {...label} onChange={switchTheme} />
        <Typography variant="h6">SKISHOP</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
