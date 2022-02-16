import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/utils/utils";
import { addBasketItemAsync, removeBasketItemAsync } from "./BasketSlice";
import BasketSummary from "./BasketSummary";

const BasketPage = () => {
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <Typography
                      component={Link}
                      to={`/catalog/${item.productId}`}
                      sx={{
                        color: "inherit",
                        textDecoration: "none",
                        fontWeight: "bold",
                        "&:hover": {
                          color: "grey.700",
                        },
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(item.price)}
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={status === "pendingRemoveItem" + item.productId}
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({ productId: item.productId })
                      )
                    }
                    color="error"
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    loading={status === "pendingAddItem" + item.productId}
                    onClick={() =>
                      dispatch(
                        addBasketItemAsync({ productId: item.productId })
                      )
                    }
                    color="secondary"
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(item.price * item.quantity)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={
                      status === "pendingRemoveAllItems" + item.productId
                    }
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                        })
                      )
                    }
                    color="error"
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
