import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Product, ProductParams } from "../../app/interfaces/product";
import { RootState } from "./../../app/store/configureStore";

interface CatalogState {
  productsLoaded: boolean;
  filtersLoaded: boolean;
  status: string;
  brands: string[];
  types: string[];
  productParams: ProductParams;
}
// stores all the product keys in array of ids[] and and product objects in entites object
const productsAdapter = createEntityAdapter<Product>();

const getAxiosParams =(productParams: ProductParams) => {
  const params = new URLSearchParams();
  params.append("pageNumber", productParams.pageNumber.toString());
  params.append("pageSize", productParams.pageSize.toString());
  params.append("orderBy", productParams.orderBy);
  if(productParams.searchTerm) params.append("searchTerm", productParams.searchTerm.toString());
  if(productParams.brands) params.append("brands", productParams.brands.toString());
  if(productParams.types) params.append("types", productParams.types.toString());

  return params;
}

export const fetchProductsAsync = createAsyncThunk<Product[], void, {state: RootState}>(
  "catalog/fetchProductsAsync",
  async (_, thunkApi) => {
    const params = getAxiosParams(thunkApi.getState().catalog.productParams)
    try {
      return await agent.Catalog.list(params);
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);
export const fetchFiltersAsync = createAsyncThunk<any>(
  "catalog/fetchFiltersAsync",
  async (_, thunkApi) => {
    try {
      return await agent.Catalog.filters();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchProductAsync = createAsyncThunk<Product, number>(
  "catalog/fetchProductAsync",
  async (id, thunkApi) => {
    try {
      return await agent.Catalog.details(id.toString());
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

const initParams = () => ({
  pageNumber: 1,
  pageSize: 6,
  orderBy: "name",
});

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productsAdapter.getInitialState<CatalogState>({
    productsLoaded: false,
    filtersLoaded: false,
    status: "idle",
    brands: [],
    types: [],
    productParams: initParams(),
  }),
  reducers: {
    setProductParams: (state, action) => {
      state.productsLoaded = false; // triggers view to refetch
      state.productParams = { ...state.productParams, ...action.payload };
    },
    resetProductParams: (state) => {
      state.productParams = initParams();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.productsLoaded = true;
    });
    builder.addCase(fetchProductsAsync.rejected, (state) => {
      state.status = "idle";
    });
    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = "pendingFetchProduct";
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchProductAsync.rejected, (state) => {
      state.status = "idle";
    });
    builder.addCase(fetchFiltersAsync.pending, (state) => {
      state.status = "pendingFetchFilters";
    });
    builder.addCase(fetchFiltersAsync.fulfilled, (state, action) => {
      state.filtersLoaded = true;
      state.types = action.payload.types;
      state.brands = action.payload.brands;
      state.status = "idle";
    });
    builder.addCase(fetchFiltersAsync.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export const productsSelectors = productsAdapter.getSelectors(
  (state: RootState) => state.catalog
);

export const { setProductParams, resetProductParams } = catalogSlice.actions;
