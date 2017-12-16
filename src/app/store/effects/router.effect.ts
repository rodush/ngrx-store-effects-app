import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Actions, Effect } from '@ngrx/effects';

import { map, tap } from 'rxjs/operators';

import * as RouterActions from '../actions/router.action';

@Injectable()
export class RouterEffect {
    constructor(
        private actions$: Actions,
        private router: Router,
        private location: Location
    ) {}

    @Effect()
    navigate$ = this.actions$.ofType(RouterActions.GO)
        .pipe(
            map((action: RouterActions.Go) => action.payload),
            tap(({path, query: queryParams, extras}) => this.router.navigate(path, {queryParams, ...extras}))
    );

    @Effect()
    navigateBack$ = this.actions$.ofType(RouterActions.BACK)
        .pipe(tap(() => this.location.back()));

    @Effect()
    navigateForward$ = this.actions$.ofType(RouterActions.FORWARD)
        .pipe(tap(() => this.location.forward()));
}