import { useEffect } from 'react';
import { productsSelectors, fetchFiltersAsync, fetchProductsAsync } from '../../pages/catalog/catalogSlice';
import { useAppSelector, useAppDispatch } from '../store/configureStore';

function useProducts() {
    const products = useAppSelector(productsSelectors.selectAll);
    const {
      productsLoaded,
      filtersLoaded,
      brands,
      types,
      metaData,
    } = useAppSelector((state) => state.catalog);
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      if (!filtersLoaded) dispatch(fetchFiltersAsync());
    }, [filtersLoaded, dispatch]);
  
    useEffect(() => {
      if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch]);

  return {
    products,
    productsLoaded,
    filtersLoaded,
    brands,
    types,
    metaData
  }
}

export default useProducts