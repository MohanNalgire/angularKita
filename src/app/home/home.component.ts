import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { TodoQuery } from '../state/query';
import { TodoStore } from '../state/store';
import { filter, switchMap, take } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { ITodo, TodoStatus } from '../todo.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatInputModule,
  ],
})
export class HomeComponent {
  loading = false;
  todos: ITodo[] = [];

  constructor(
    private apiSerivce: ApiService,
    private router: Router,
    private todoquery: TodoQuery,
    private todoStore: TodoStore
  ) {}

  ngOnInt(): void {
    this.todoquery.getIsLoading().subscribe();
    this.todoquery.getTodos().subscribe();
    this.todoquery.getLoaded()
      .pipe(
        take(1),
        filter((res) => !res),
        switchMap(() => {
          this.todoStore.setLoading(true);
          return this.apiSerivce.getTodos()|| false;
        })
      )
      .subscribe({
        next: (res) => {
          this.todoStore.update(() => {
            return { todos: res };
          });
          this.todoStore.setLoading(false);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('complete.');
        },
      });
  }

  addTodo() {
    this.router.navigateByUrl('add-todo');
  }

  markAsComplete(id: string) {
    this.apiSerivce.updateTodo(id, { status: TodoStatus.DONE })
    .subscribe({
      next: (res) => {
        this.todoStore.update((state: { todos: any }) => {
          const todos = [...state.todos];
          const index = todos.findIndex((t) => t.id === id);
          todos[index] = {
            ...todos[index],
            status: TodoStatus.DONE,
          };
          return { ...state, todos };
        });
      },
      error: (err) => {},
    });
  }

  deleteTodo(id:string){
    this.apiSerivce.deleteTodo(id)
      .subscribe({
        next:(res)=>{
          this.todoStore.update(state=>({...state,todos:state.todos.filter(t=>t._id === id)}));
        },
        error:(err)=>{console.log(err)}
      })
  }


}
