import { Query } from "@datorama/akita";
import { TodoState, TodoStore } from "./store";
import { state } from "@angular/animations";
import { Observable } from "rxjs";
import { ITodo } from "../todo.model";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class TodoQuery extends Query<TodoState> {
    getIsloading: any;

    constructor(private todoStore:TodoStore){
        super(todoStore);
    }

    getTodos():Observable<ITodo[]>{
        return this.select(state => state.todos);
    }

    getLoaded():Observable<boolean>{
        return this.select(state=> state.isLoaded);
    }

    getLoading():Observable<boolean>{
        return this.selectLoading();
    }
}


// https://www.youtube.com/watch?v=2Re3Fm8fV8o&list=PLaY6YJMqp51eoN-bVk01nwEmYJ2cB7UUz&index=7