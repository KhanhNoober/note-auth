import { AuthState } from '../states/auth.state';
import * as AuthActions from '../actions/auth.action';
import { createReducer, on } from '@ngrx/store';

const initialState: AuthState = {
  isAuthenticated: false,
  idToken: '',
  error: '',
};

export const AuthReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => state),
  on(AuthActions.loginSucceeded, (state, action) => ({
    ...state,
    isAuthenticated: true,
    idToken: action.idToken,
  })),
  on(AuthActions.loginFailed, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    isAuthenticated: false,
    idToken: '',
  }))
);
