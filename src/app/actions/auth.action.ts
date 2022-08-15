import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login');
export const loginSucceeded = createAction(
  '[Auth] Login Succeeded',
  props<{ idToken: string }>()
);
export const loginFailed = createAction(
  '[Auth] Login Failed',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
