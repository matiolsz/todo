import { Component } from '@angular/core';
import { TodoService } from '../service/todo.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  categoryId!: string;
  todos!: Array<any>;

  todoName!: string;
  todoId!: string;
  buttonStatus: string = 'Add';

  constructor(private todoService: TodoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.todoService.loadTodos(this.categoryId).subscribe(val => {
      this.todos = val;
    })
  }

  onSubmit(f: NgForm) {
    if (this.buttonStatus == 'Add') {
      let todo = {
        todo: f.value.todoText,
        isCompleted: false
      }
      this.todoService.saveTodo(this.categoryId, todo);
      f.resetForm();
    } else {
      this.todoService.updateTodo(this.categoryId,this.todoId,this.todoName);
      this.buttonStatus = "Add";
      f.resetForm();
    }
  }

  onEdit(todoName: string, todoId: string) {
    this.todoName = todoName;
    this.todoId = todoId;
    this.buttonStatus = 'Edit';
  }

  delete(todoId:string) {
    this.todoService.deleteTodo(this.categoryId, todoId);
  }

  markComplete(todoId:string){
    this.todoService.markComplete(this.categoryId, todoId);
  }

  markUncomplete(todoId:string){
    this.todoService.markUncomplete(this.categoryId, todoId);
  }
}
