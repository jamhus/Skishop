import { Container, CssBaseline } from "@mui/material";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { useEffect, useState } from "react";
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
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../utils/utils";
import agent from "../api/agent";
import Loading from "./Loading";
import CheckoutPage from "../../pages/checkout/Checkout";

const App = () => {
  const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => setBasket(basket))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
    else {
      setLoading(false)
    }
  }, [setBasket]);

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

  if(loading) return <Loading message="Initalizing app..."/>

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
          <Route path="/checkout" component={CheckoutPage} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </ThemeProvider>
  );
};

export default App;
