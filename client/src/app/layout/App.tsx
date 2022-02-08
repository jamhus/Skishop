import { Container, CssBaseline } from "@mui/material";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { useState } from "react";
import Catalog from "../../features/Catalog/Catalog";
import Header from "./Header";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: darkMode ? "#121212" : "#eaeaea",
      },
    },
  });

  const switchTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header switchTheme={switchTheme} />
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  );
};

export default App;
