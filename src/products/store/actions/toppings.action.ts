import { Action } from '@ngrx/store';

import { Topping } from '../../models/topping.model';

export const LOAD_TOPPINGS = '[Products] Load Toppings';
export const LOAD_TOPPINGS_SUCCESS = '[Products] Load Toppings Succeed';
export const LOAD_TOPPINGS_FAIL = '[Products] Load Toppings Failed';
export const VISUALIZE_TOPPINGS = '[Products] Visualise Toppings'

export class LoadToppings implements Action {
    readonly type = LOAD_TOPPINGS;
}

export class LoadToppingsSuccess implements Action {
    readonly type = LOAD_TOPPINGS_SUCCESS;
    constructor(public payload: any) {}
}

export class LoadToppingsFail implements Action {
    readonly type = LOAD_TOPPINGS_FAIL;
    constructor(public payload: any) {}
}

export class VisualiseToppings implements Action {
    readonly type = VISUALIZE_TOPPINGS;
    constructor(public payload: number[]) {}
}

export type ToppingsAction = 
    | LoadToppings
    | LoadToppingsSuccess
    | LoadToppingsFail
    | VisualiseToppings;