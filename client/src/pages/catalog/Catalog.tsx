import {
  Grid,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import CheckBoxGroup from "../../app/components/CheckBoxGroup";
import Loading from "../../app/components/Loading";
import RadioButtonsGroup from "../../app/components/RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  fetchFiltersAsync,
  fetchProductsAsync,
  productsSelectors,
  setProductParams,
} from "./catalogSlice";
import ProductsList from "./ProductList";
import ProductSearch from "./ProductSearch";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price - High to low" },
  { value: "price", label: "Price - low to high" },
];
const Catalog = () => {
  const products = useAppSelector(productsSelectors.selectAll);
  const {
    productsLoaded,
    status,
    filtersLoaded,
    brands,
    types,
    productParams,
  } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersAsync());
  }, [filtersLoaded, dispatch]);

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  if (status.includes("pending"))
    return <Loading message="Loading products..." />;
  return (
    <Grid container spacing={4} mt={5}>
      <Grid item xs={12} md={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonsGroup
            selectedValue={productParams.orderBy}
            options={sortOptions}
            onChange={(e) =>
              dispatch(setProductParams({ orderBy: e.target.value }))
            }
          />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
        <CheckBoxGroup
            options={brands}
            checked={productParams.brands}
            onChange={(brands: string[]) =>
              dispatch(setProductParams({ brands }))
            }
          />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckBoxGroup
            options={types}
            checked={productParams.types}
            onChange={(types: string[]) =>
              dispatch(setProductParams({ types }))
            }
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={9}>
        <ProductsList products={products} />
      </Grid>
      <Grid item xs={0} md={3} />

      <Grid item xs={12} md={9}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>Displaying 1-6 of 20 items</Typography>
          <Pagination color="primary" size="large" count={10} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Catalog;
