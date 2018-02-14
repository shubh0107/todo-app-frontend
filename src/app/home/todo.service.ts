import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Todo} from '../models/todo';

@Injectable()
export class TodoService {
  private apiUrl = 'http://localhost:3000/api/todo/';
  constructor(private http: Http) {}

  getTodos() {
    return this.http.get(this.apiUrl);
  }

  createTodo(newTodo) {
    console.log('Here in todo service-')
    return this.http.post(this.apiUrl , newTodo);
  }

  updateTodo(newTodo) {
    return this.http.put(this.apiUrl, newTodo);
  }

  deleteTodo(id: String) {
    console.log('In deleteTodo of services. id-' + id);
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
