import { Container, CssBaseline } from "@mui/material";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { useCallback, useEffect, useState } from "react";
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
import Loading from "./Loading";
import CheckoutPage from "../../pages/checkout/Checkout";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync } from "../../pages/basket/BasketSlice";
import Login from "../../pages/account/Login";
import Register from "../../pages/account/Register";
import { fetchCurrentUser } from "../../pages/account/accountSlice";
import PrivateRoute from "./PrivateRoute";
import Orders from "../../pages/orders/Order";

const App = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

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

  if (loading) return <Loading message="Initalizing app..." />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={switchTheme} />
      <Container>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route exact path="/catalog" component={Catalog} />
          <Route path="/catalog/:id" component={ProductDetails} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/server-error" component={ServerError} />
          <Route path="/basket" component={BasketPage} />
          <PrivateRoute path="/checkout" component={CheckoutPage} />
          <PrivateRoute path="/orders" component={Orders} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </ThemeProvider>
  );
};

export default App;
