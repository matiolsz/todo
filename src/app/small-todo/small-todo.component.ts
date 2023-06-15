import { Component, Input } from '@angular/core';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-small-todo',
  templateUrl: './small-todo.component.html',
  styleUrls: ['./small-todo.component.css']
})
export class SmallTodoComponent {

  constructor(private todoService: TodoService) {}

  @Input() categoryId = '';
  
  todos!: Array<any>;

  ngOnInit(): void {
  
    this.todoService.getTenTodos(this.categoryId).subscribe(val => {
      this.todos = val;
    })

  }


}
