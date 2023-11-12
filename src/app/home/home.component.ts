import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router'
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports:[ MatToolbarModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule, MatInputModule]
})
export class HomeComponent {
    constructor(private router:Router){}
    ngOnInt():void{}
    addTodo(){
        this.router.navigateByUrl('add-todo');
    }
}
