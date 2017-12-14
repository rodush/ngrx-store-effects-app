import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/Observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as toppingsActions from '../actions/toppings.action';
import * as fromServices from '../../services/toppings.service';

@Injectable()
export class ToppingsEffects {
    constructor(private actions$: Actions, private toppingsService: fromServices.ToppingsService) {}

    @Effect()
    loadToppings$ = this.actions$.ofType(toppingsActions.LOAD_TOPPINGS_SUCCESS).pipe(
        switchMap(() => {
            return this.toppingsService.getToppings().pipe(
                map(toppings => {new toppingsActions.LoadToppingsSuccess(toppings)}),
                catchError(error => of(new toppingsActions.LoadToppingsFail(error)))
            )
        })
    )
}