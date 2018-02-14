import {Component, OnInit} from '@angular/core';
import { Todo } from '../../models/todo';
import {TodoService} from '../todo.service';
import {NgForm} from '@angular/forms';



@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  /*newTodo = {
    title: '',
    description: ''
  };*/
  editedTodo = new Todo('', '', '');
  todoToDelete = new Todo('', '', '');
  apiMessage: String;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
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

  showAddNewTodoForm() {
    this.apiMessage = '';
  }

  showEditForm(todo: Todo) {
    this.editedTodo = todo;
    this.apiMessage = '';
  }

  showDeleteTodo(todo: Todo) {
    this.todoToDelete = todo;
    this.apiMessage = '';
  }

  addNewTodo(form: NgForm) {
    const todo = {
      title : form.value.title,
      description : form.value.description
    };
    this.todoService.createTodo(todo).subscribe(
      (response) => {
        if (response.json().success) {
          this.todos.push(response.json().data);
          this.apiMessage = response.json().message;
        }
      }
    );
  }

  editTodo(form: NgForm) {
    console.log('here');

    const todo = {
      title : form.value.todoTitle,
      description : form.value.todoDesc,
      _id : this.editedTodo._id
    };
    console.log(todo);
   // if (!todo) { return; }
  //  this.editedTodo._id = this.editedTodo._id;
    this.todoService.updateTodo(todo).subscribe(
      (response) => {
        this.apiMessage = response.json().message;
        this.getTodos();
       /* const updatedTodo = response.json().data;
        const updatedTodos = this.todos.map(
          (temp) => {
            if (updatedTodo._id !== temp._id) {
              return temp;
            }
            return  updatedTodo;
          });

        this.todos = updatedTodos;*/
      }
    );
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo._id).subscribe(
      (response) => {
        const responseJson = response.json();
        this.apiMessage = responseJson.message;
        console.log(this.apiMessage);
        this.getTodos();
      }
    );
  }

}
