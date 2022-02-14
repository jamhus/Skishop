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
import agent from "../../app/api/agent";
import Loading from "../../app/components/Loading";
import { Product } from "../../app/interfaces/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/utils/utils";
import { removeItem, setBasket } from "../basket/BasketSlice";

const ProductDetails = () => {
  const {basket} = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const item = basket?.items.find((i) => i.productId === product?.id);

  useEffect(() => {
    if (item) {
      setQuantity(item.quantity);
    }

    agent.Catalog.details(id)
      .then((product) => setProduct(product))
      .finally(() => setLoading(false));
  }, [id, item]);

  const handleAddItem = (productId: number) => {
    setSubmitting(true);
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      agent.Basket.addItem(productId, updatedQuantity)
        .then((basket) => dispatch(setBasket(basket)))
        .catch((err) => console.log(err))
        .finally(() => setSubmitting(false));
    } else {
      const updatedQuantity = item.quantity - quantity;
      agent.Basket.removeItem(productId, updatedQuantity)
      .then(() => dispatch(removeItem({productId, quantity :updatedQuantity})))
      .catch((err) => console.log(err))
      .finally(() => setSubmitting(false));
    }
  };

  const handleInputChange = (event: any) => {
    const value = parseInt(event.target.value);
    setQuantity(value < 0 ? 0 : value);
  };

  if (loading) return <Loading message="Loading product..." />;

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
              loading={submitting}
              sx={{ height: "55px" }}
              onClick={() => handleAddItem(product.id)}
              color="primary"
              variant="contained"
              fullWidth
              disabled={(item?.quantity === quantity) || (!item && quantity === 0)}
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
