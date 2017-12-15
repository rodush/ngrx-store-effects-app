import { Action } from '@ngrx/store';
import { Pizza } from '../../models/pizza.model';

// load pizzas
export const LOAD_PIZZAS = '[Products] Load Pizzas';
export const LOAD_PIZZAS_FAIL = '[Products] Load Pizzas Failed';
export const LOAD_PIZZAS_SUCCESS = '[Products] Load Pizzas Succeed';

export class LoadPizzas implements Action {
    readonly type = LOAD_PIZZAS;
}

export class LoadPizzasFail implements Action {
    readonly type = LOAD_PIZZAS_FAIL;
    constructor(public payload: any) {}
}

export class LoadPizzasSucess implements Action {
    readonly type = LOAD_PIZZAS_SUCCESS;
    constructor(public payload: Pizza[]) {}
}

// create pizza
export const CREATE_PIZZA = '[Products] Create Pizza';
export const CREATE_PIZZA_SUCCESS = '[Products] Create Pizza Succeed';
export const CREATE_PIZZA_FAIL = '[Products] Create Pizza Failed';

export class CreatePizza implements Action {
    readonly type = CREATE_PIZZA;
    constructor(public payload: Pizza) {}
}

export class CreatePizzaSucess implements Action {
    readonly type = CREATE_PIZZA_SUCCESS;
    constructor(public payload: Pizza) {}
}

export class CreatePizzaFail implements Action {
    readonly type = CREATE_PIZZA_FAIL;
    constructor(public payload: any) {}
}

// update pizza
export const UPDATE_PIZZA = '[Products] Update Pizza';
export const UPDATE_PIZZA_SUCCESS = '[Products] Update Pizza Succeed';
export const UPDATE_PIZZA_FAIL = '[Products] Update Pizza Failed';

export class UpdatePizza implements Action {
    readonly type = UPDATE_PIZZA;
    constructor(public payload: Pizza) {}
}

export class UpdatePizzaSucess implements Action {
    readonly type = UPDATE_PIZZA_SUCCESS;
    constructor(public payload: Pizza) {}
}

export class UpdatePizzaFail implements Action {
    readonly type = UPDATE_PIZZA_FAIL;
    constructor(public payload: any) {}
}

// delete pizza
export const DELETE_PIZZA = '[Products] Delete Pizza';
export const DELETE_PIZZA_SUCCESS = '[Products] Delete Pizza Succeed';
export const DELETE_PIZZA_FAIL = '[Products] Delete Pizza Failed';

export class DeletePizza implements Action {
    readonly type = DELETE_PIZZA;
    constructor(public payload: Pizza) {}
}

export class DeletePizzaSucess implements Action {
    readonly type = DELETE_PIZZA_SUCCESS;
    constructor(public payload: Pizza) {}
}

export class DeletePizzaFail implements Action {
    readonly type = DELETE_PIZZA_FAIL;
    constructor(public payload: any) {}
}

// action types
export type PizzasAction = 
    | LoadPizzas
    | LoadPizzasSucess
    | LoadPizzasFail
    | CreatePizza
    | CreatePizzaSucess
    | CreatePizzaFail
    | UpdatePizza
    | UpdatePizzaSucess
    | UpdatePizzaFail
    | DeletePizza
    | DeletePizzaSucess
    | DeletePizzaFail
;