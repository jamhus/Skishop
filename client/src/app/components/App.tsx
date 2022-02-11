import { Container, CssBaseline } from "@mui/material";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../pages/about/AboutPage";
import Catalog from "../../pages/catalog/Catalog";
import ProductDetails from "../../pages/catalog/ProductDetails";
import ContactPage from "../../pages/contact/ContactPage";
import HomePage from "../../pages/home/HomePage";
import Header from "./Header";

import "react-toastify/dist/ReactToastify.css";
import ServerError from "../errors/ServerErrors";
import NotFound from "../errors/NotFound";
import BasketPage from "../../pages/basket/BasketPage";

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
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header switchTheme={switchTheme} />
      <Container>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route exact path="/catalog" component={Catalog} />
          <Route path="/catalog/:id" component={ProductDetails} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/server-error" component={ServerError} />
          <Route path="/basket" component={BasketPage} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </ThemeProvider>
  );
};

export default App;
