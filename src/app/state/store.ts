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
@StoreConfig({name:'todo'})
export class TodoStore extends Store<TodoState> {
    constructor(){
        super(getInitialState());
    }
}

// https://www.youtube.com/watch?v=2Re3Fm8fV8o&list=PLaY6YJMqp51eoN-bVk01nwEmYJ2cB7UUz&index=7
// https://github.com/Evoqys/akita-youtube
