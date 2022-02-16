import { LoadingButton } from "@mui/lab";
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../app/components/Loading";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/utils/utils";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
} from "../basket/BasketSlice";
import { fetchProductAsync, productsSelectors } from "./catalogSlice";

const ProductDetails = () => {
  const { basket, status } = useAppSelector((state) => state.basket);
  const { status: productStatus } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector((state) =>
    productsSelectors.selectById(state, id)
  );
  const [quantity, setQuantity] = useState(0);
  const item = basket?.items.find((i) => i.productId === product?.id);

  useEffect(() => {
    if (item) {
      setQuantity(item.quantity);
    }
    if (!product) dispatch(fetchProductAsync(parseInt(id)));
  }, [dispatch, id, item, product]);

  const handleAddItem = (productId: number) => {
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(addBasketItemAsync({ productId, quantity: updatedQuantity }));
    } else {
      const updatedQuantity = item.quantity - quantity;
      dispatch(removeBasketItemAsync({ productId, quantity: updatedQuantity }));
    }
  };

  const handleInputChange = (event: any) => {
    const value = parseInt(event.target.value);
    setQuantity(value < 0 ? 0 : value);
  };

  if (productStatus.includes("pending"))
    return <Loading message="Loading product..." />;

  if (!product) return <h3>product not found</h3>;

  return (
    <Grid container spacing={6}>
      <Grid item sm={12} md={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item sm={12} md={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          {currencyFormat(product.price)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>
                  Quantity in stock
                </TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              onChange={handleInputChange}
              variant="outlined"
              type="number"
              label="quantity in cart"
              fullWidth
              value={quantity}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LoadingButton
              loading={status.includes("pending" + product.id)}
              sx={{ height: "55px" }}
              onClick={() => handleAddItem(product.id)}
              color="primary"
              variant="contained"
              fullWidth
              disabled={
                item?.quantity === quantity || (!item && quantity === 0)
              }
            >
              {item ? "Update quantity" : "Add to Cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
