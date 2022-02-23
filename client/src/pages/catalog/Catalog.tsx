import { Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import CheckBoxGroup from "../../app/components/CheckBoxGroup";
import Loading from "../../app/components/Loading";
import PaginationBar from "../../app/components/Pagination";
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
    filtersLoaded,
    brands,
    types,
    productParams,
    metaData,
  } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersAsync());
  }, [filtersLoaded, dispatch]);

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  if (!filtersLoaded)
    return <Loading message="Loading products..." />;
  return (
    <Grid container columnSpacing={4} mt={5}>
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
              dispatch(setProductParams({ brands, pageNumber: 1 }))
            }
          />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckBoxGroup
            options={types}
            checked={productParams.types}
            onChange={(types: string[]) =>
              dispatch(setProductParams({ types, pageNumber: 1 }))
            }
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={9}>
        <ProductsList products={products} />
      </Grid>
      <Grid item xs={0} md={3} />
      {metaData && (
        <Grid item xs={12} md={9}>
          <PaginationBar
            metaData={metaData}
            onChange={(page: number) =>
              dispatch(setProductParams({ pageNumber: page }))
            }
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Catalog;
