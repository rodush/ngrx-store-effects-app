import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { take, tap, filter, map, switchMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import * as fromStore from '../store';

@Injectable()
export class PizzaExistsGuard implements CanActivate {
    constructor(private store: Store<fromStore.ProductsState>) {}

    canActivate(activatedRoute: ActivatedRouteSnapshot): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => {
                const id = parseInt(activatedRoute.params.pizzaId, 10);

                return this.hasPizza(id);
            })
        );
    }

    hasPizza(id: number): Observable<boolean> {
        return this.store.select(fromStore.getPizzasEntities)
            .pipe(
                map(entities => !!entities[id]),
                take(1)
            );
    }

    checkStore(): Observable<boolean> {
        return this.store.select(fromStore.getPizzasLoaded)
            .pipe(
                tap(loaded => {
                    if(!loaded) {
                        this.store.dispatch(new fromStore.LoadPizzas());
                    }
                }),
                filter(loaded => loaded),
                take(1)
            );
    }
}