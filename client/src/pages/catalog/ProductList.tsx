import { Grid } from "@mui/material";
import { Product } from "../../app/interfaces/product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}
const ProductsList = ({ products }: Props) => {
  return (
    <Grid container spacing={4}>
      {products.map((product: Product) => {
        return (
          <Grid key={product.id} item xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ProductsList;
