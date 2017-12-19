import { TestBed } from '@angular/core/testing';

import { Store, StoreModule, combineReducers } from '@ngrx/store';

import * as fromRoot from '../../../app/store/reducers';
import * as fromActions from '../actions';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';

import { Pizza } from '../../models/pizza.model';

describe('Pizza Selectors', () => {
    let store: Store<fromReducers.ProductsState>;

    const pizza1 = {
        "name": "Blazin' Inferno",
        "toppings": [
          {
            "id": 10, "name": "pepperoni"
          },
          {
            "id": 9, "name": "pepper"
          }
        ],
        "id": 1
      };
    const pizza2 = {
        "name": "Seaside Surfin'",
        "toppings": [
          {
            "id": 9, "name": "pepper"
          },
          {
            "id": 5, "name": "mozzarella"
          },
          {
            "id": 10, "name": "pepperoni"
          }
        ],
        "id": 2
      };
    const pizzas: Pizza[] = [pizza1, pizza2];

    const entities = {
        1: pizzas[0],
        2: pizzas[1],
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    ...fromRoot.reducers,
                    products: combineReducers(fromReducers.reducers)
                })
            ]
        });

        store = TestBed.get(Store);

        spyOn(store, 'dispatch').and.callThrough();
    });

    describe('getPizzaEntities', () => {
        it('should return pizzas as entities', () => {
            let result;

            store
                .select(fromSelectors.getPizzasEntities)
                .subscribe(value => (result = value));
    
            expect(result).toEqual({});
    
            store.dispatch(new fromActions.LoadPizzasSucess(pizzas));
    
            expect(result).toEqual(entities);
        });
    });

    describe('getSelectedPizza', () => {
        it('should return selected pizza as an entity', () => {
            let result;
            let params;

            store.dispatch(new fromActions.LoadPizzasSucess(pizzas));

            store.dispatch({
                type: 'ROUTER_NAVIGATION',
                payload: {
                    routerState: {
                        url: '/products',
                        queryParams: {},
                        params: {pizzaId: '2'},
                    },
                    event: {}
                }
            });

            store
                .select(fromRoot.getRouterState)
                .subscribe(routerState => params = routerState.state.params);

            expect(params).toEqual({pizzaId: '2'});

            store
                .select(fromSelectors.getSelectedPizza)
                .subscribe(selectedPizza => result = selectedPizza);

            expect(result).toEqual(pizza2);
        });
    });

    describe('getPizzaVisualized', () => {
        it('should return selected pizza with selected toppings', () => {
            let result;
            let toppings = [
                {
                    "id": 9, "name": "pepper"
                  },
                  {
                    "id": 5, "name": "mozzarella"
                  },
                  {
                    "id": 10, "name": "pepperoni"
                  }
            ];

            store.dispatch(new fromActions.LoadPizzasSucess(pizzas));
            store.dispatch(new fromActions.LoadToppingsSuccess(toppings));
            store.dispatch(new fromActions.VisualiseToppings([10, 5]));

            store.dispatch({
                type: 'ROUTER_NAVIGATION',
                payload: {
                    routerState: {
                        url: '/products',
                        queryParams: {},
                        params: {pizzaId: '2'},
                    },
                    event: {}
                }
            });

            store
                .select(fromSelectors.getPizzaVisualised)
                .subscribe(selectedPizza => (result = selectedPizza));

            const expectedToppings = [toppings[2], toppings[1]];

            expect(result).toEqual({...entities[2], toppings: expectedToppings});
        });
    });
});