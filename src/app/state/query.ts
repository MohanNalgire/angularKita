import { Query } from "@datorama/akita";
import { TodoState, TodoStore } from "./store";
import { state } from "@angular/animations";
import { Observable } from "rxjs";
import { ITodo } from "../todo.module";

export class TodoQuery extends Query<TodoState> {
    
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
