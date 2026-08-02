import { createAction, props } from '@ngrx/store';

export const setAllCategory = createAction(
  '[Product] Set All Category',
  props<{ categories: any[] }>()
);

export const setLoadingCategory = createAction(
  '[Product] Set Loading Category',
  props<{ loading: boolean }>()
);

export const setAllSubCategory = createAction(
  '[Product] Set All Sub Category',
  props<{ subCategories: any[] }>()
);

export const setProducts = createAction(
  '[Product] Set Products',
  props<{ products: any[] }>()
);

export const clearProducts = createAction(
  '[Product] Clear Products'
);