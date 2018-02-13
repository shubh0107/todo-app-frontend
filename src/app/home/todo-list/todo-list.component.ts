import {Component, OnInit} from '@angular/core';
import { Todo } from '../../models/todo';
import {TodoService} from '../todo.service';



@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  newTodo = {
    title: '',
    description: ''
  };
  editedTodo = new Todo('', '', '');

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(
      (response) => {
        if (response.json().success) {
          this.todos = response.json().data;
        } else {
          console.log('Error while fetching todos');
        }
      }
    );
  }

  showEditForm(todo: Todo) {
    this.editedTodo = todo;
  }

  addNewTodo(newTodo: Todo) {
    console.log('Here!');
    this.todoService.createTodo(newTodo).subscribe(
      (response) => {
        if (response.json().success) {
          this.todos.push(response.json().data);
        }
      }
    );
  }

  editTodo(todo: Todo) {
    if (!todo) { return; }
    todo._id = this.editedTodo._id;
    this.todoService.updateTodo(todo).subscribe(
      (response) => {
        const updatedTodo = response.json().data;
        const updatedTodos = this.todos.map(
          (temp) => {
            if (updatedTodo._id !== temp._id) {
              return temp;
            }
            return  updatedTodo;
          });

        this.todos = updatedTodos;
      }
    );
  }

}
