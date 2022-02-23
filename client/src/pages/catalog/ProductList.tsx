import { Grid } from "@mui/material";
import { Product } from "../../app/interfaces/product";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  products: Product[];
}
const ProductsList = ({ products }: Props) => {
  const { productsLoaded } = useAppSelector((state) => state.catalog);
  return (
    <Grid container spacing={4}>
      {products.map((product: Product) => {
        return (
          <Grid key={product.id} item xs={12} sm={6} md={4}>
            {!productsLoaded ? (
              <ProductCardSkeleton />
            ) : (
              <ProductCard product={product} />
            )}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ProductsList;
