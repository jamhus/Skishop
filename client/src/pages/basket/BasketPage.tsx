import {
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";
import BasketSummary from "./BasketSummary";
import BasketTable from "./BasketTable";

const BasketPage = () => {
  const { basket } = useAppSelector((state) => state.basket);

  if (!basket || basket.items.length < 1)
    return (
      <Typography
        variant="h3"
        gutterBottom
        sx={{ p: 2, justifyContent: "center", display: "flex" }}
      >
        Your basket is empty
      </Typography>
    );

  return (
    <>
      <BasketTable items = {basket.items}/>
      <Grid container mt={1}>
        <Grid item xs={0} md={6} />
        <Grid item xs={12} md={6}>
          <BasketSummary />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            sx={{ marginTop: "10px" }}
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default BasketPage;
