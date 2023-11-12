import { Store, StoreConfig } from "@datorama/akita";
import { ITodo } from "../todo.model";
import { Injectable } from "@angular/core";

export interface TodoState {
    todos: ITodo[],
    isLoaded: boolean
}

// Initial state
export const getInitialState = () => {
    return {
        todos:[],
        isLoaded:false
    };
}

@Injectable({
    providedIn:'root'
})
@StoreConfig({name:'root'})
export class TodoStore extends Store<TodoState> {
    constructor(){
        super(getInitialState());
    }
}