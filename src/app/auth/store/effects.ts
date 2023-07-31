import { Inject, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../services/auth.service";
import { authActions } from "./actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { PersistenceService } from "src/app/shared/services/persistence.service";
import { Router } from "@angular/router";

export const getCurrentUserEffect = createEffect(
  (
    action$ = inject(Actions),
    authService = inject(AuthService),
    persistenceService = inject(PersistenceService)
  ) => {
    return action$.pipe(
      ofType(authActions.getCurrentUser),
      switchMap(() => {
        const token = persistenceService.get("accessToken");
        console.log(token);
        if (!token) {
          return of(authActions.getCurrentUserFailure());
        } else {
          return authService.getCurrentUser().pipe(
            map((currentUser: CurrentUserInterface) => {
              return authActions.getCurrentUserSuccess({ currentUser });
            }),
            catchError((errors) => {
              return of(authActions.getCurrentUserFailure());
            })
          );
        }
      })
    );
  },
  { functional: true }
);

export const registerEffects = createEffect(
  (
    action$ = inject(Actions),
    authService = inject(AuthService),
    persistenceService = inject(PersistenceService)
  ) => {
    return action$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) => {
        return authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            persistenceService.set("accessToken", currentUser.token);
            return authActions.registerSuccess({ currentUser });
          }),
          catchError((errorResponce: HttpErrorResponse) => {
            return of(
              authActions.registerFailure({
                errors: errorResponce.error.errors,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const redirectAfterRegisterEffect = createEffect(
  (action$ = inject(Actions), router = inject(Router)) => {
    return action$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => {
        router.navigateByUrl("/");
      })
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);

export const loginEffect = createEffect(
  (
    action$ = inject(Actions),
    persistenceService = inject(PersistenceService),
    authService = inject(AuthService)
  ) => {
    return action$.pipe(
      ofType(authActions.login),
      switchMap(({ request }) => {
        return authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            persistenceService.set("accessToken", currentUser.token);
            return authActions.loginSuccess({ currentUser });
          }),
          catchError((errorResponce: HttpErrorResponse) => {
            return of(
              authActions.loginFailure({
                errors: errorResponce.error.errors,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const RedirectAfteLoginEffect = createEffect(
  (action$ = inject(Actions), router = inject(Router)) => {
    return action$.pipe(
      ofType(authActions.loginSuccess),
      tap(() => {
        router.navigateByUrl("/feed");
      })
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);

export const logoutEffect = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    persistanceService = inject(PersistenceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.logout),
      tap(() => {
        persistanceService.set("accessToken", "");
        router.navigateByUrl("/");
      })
    );
  },
  { functional: true, dispatch: false }
);
