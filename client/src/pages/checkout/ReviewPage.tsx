import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../app/store/configureStore";
import BasketSummary from "../basket/BasketSummary";
import BasketTable from "../basket/BasketTable";

const Review = () => {
  const { basket } = useAppSelector((state) => state.basket);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {basket && <BasketTable items={basket.items} isBasket={false} />}
      <Grid container mt={1}>
        <Grid item xs={0} md={6} />
        <Grid item xs={12} md={6}>
          <BasketSummary />
        </Grid>
      </Grid>
    </>
  );
};

export default Review;
