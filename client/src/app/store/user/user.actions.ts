import { createAction, props } from '@ngrx/store';
import { UserState } from './user.reducer';


export const setUserDetails = createAction(
  '[User] Set User Details',
  props<{ user: UserState }>()
);

export const updatedAvatar = createAction(
  '[User] Updated Avatar',
  props<{ avatar: string }>()
);

export const logout = createAction('[User] Logout');