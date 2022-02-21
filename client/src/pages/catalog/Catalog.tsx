import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
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
  { value: "price", label: "PRice - low to high" },
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
          <FormGroup>
            {brands.map((brand) => {
              return (
                <FormControlLabel
                  control={<Checkbox />}
                  label={brand}
                  key={brand}
                />
              );
            })}
          </FormGroup>
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <FormGroup>
            {types.map((type) => {
              return (
                <FormControlLabel
                  control={<Checkbox />}
                  label={type}
                  key={type}
                />
              );
            })}
          </FormGroup>
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
