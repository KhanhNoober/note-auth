import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../Services/auth.service';
import * as AuthActions from '../actions/auth.action';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(private action$: Actions, private authService: AuthService) {}

  authEffects$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthActions.login),
      switchMap(() => this.authService.login()),
      map((idToken) => AuthActions.loginSucceeded({ idToken: idToken })),
      catchError((error) => of(AuthActions.loginFailed({ error })))
    )
  );
}
