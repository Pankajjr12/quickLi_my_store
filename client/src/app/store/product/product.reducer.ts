import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';

export interface ProductState {
  allCategory: any[];
  loadingCategory: boolean;
  allSubCategory: any[];
  product: any[];
}

export const initialState: ProductState = {
  allCategory: [],
  loadingCategory: false,
  allSubCategory: [],
  product: []
};

export const productReducer = createReducer(
  initialState,

  on(ProductActions.setAllCategory, (state, { categories }) => ({
    ...state,
    allCategory: [...categories]
  })),

  on(ProductActions.setLoadingCategory, (state, { loading }) => ({
    ...state,
    loadingCategory: loading
  })),

  on(ProductActions.setAllSubCategory, (state, { subCategories }) => ({
    ...state,
    allSubCategory: [...subCategories]
  })),

  on(ProductActions.setProducts, (state, { products }) => ({
    ...state,
    product: [...products]
  })),

  on(ProductActions.clearProducts, () => ({
    ...initialState
  }))
);