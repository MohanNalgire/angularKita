import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoStore } from '../state/store';
import { TodoQuery } from '../state/query';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class AddTodoComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private apiService: ApiService,
    private todoStore: TodoStore,
    private router: Router
  ) {}
  ngOnInit(): void {}

  addTodo() {
    console.log(this.form.value);
    this.todoStore.setLoading(true);
    this.apiService
      .addTodo(
        this.form.controls.title.value!,
        this.form.controls.description.value!
      )
      .subscribe({
        next: (res) => {
                    this.todoStore.update(state => ({todos: [...state.todos, res]}));
          this.todoStore.setLoading(false);
          this.router.navigateByUrl('');
        },
        error: (err) => {
          console.log(err);
          this.todoStore.setLoading(false);
        },
      });
  }
}
