import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { ITodo } from "./todo.model";
import { environment } from "src/environments/environment.development";


@Injectable({
    providedIn:'root'
})

export class ApiService {
    private readonly baseURL = environment.baseURL;

    constructor(private http: HttpClient){

    }

    addTodo(title:string, description:string):Observable<ITodo>{
        return this.http.post<ITodo>(this.baseURL, {title, description});
    }
    getTodo():Observable<ITodo[]>{
        return this.http.get<{data:ITodo[]}>(this.baseURL)
        .pipe(
            map(res=> res.data)
        );
    }
    deleteTodo(id:string):Observable<ITodo>{
        return this.http.delete<ITodo>(`${this.baseURL}/${id}`);
    }
    updateTodo(id:string, changes:any):Observable<ITodo>{
        return this.http.put<ITodo>(`${this.baseURL}/${id}`, changes);
    }
}
