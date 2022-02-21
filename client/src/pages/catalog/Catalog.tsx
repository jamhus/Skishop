import { useEffect } from "react";
import Loading from "../../app/components/Loading";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  fetchFiltersAsync,
  fetchProductsAsync,
  productsSelectors,
} from "./catalogSlice";
import ProductsList from "./ProductList";

const Catalog = () => {
  const products = useAppSelector(productsSelectors.selectAll);
  const { productsLoaded, status, filtersLoaded } = useAppSelector(
    (state) => state.catalog
  );
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
    <>
      <ProductsList products={products} />
    </>
  );
};

export default Catalog;
