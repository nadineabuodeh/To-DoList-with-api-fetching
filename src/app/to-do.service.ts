import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Todo {
  title: string;
  id: number;
  complete: boolean;
  isEditing?: boolean; 
  editTitle?: string; 
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:8080/api/todos';

  constructor(private http: HttpClient) { }

  getTask(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  getTaskById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }

  addTask(title: string): Observable<Todo> {
    const newTodo = { title, isComplete: false };
    return this.http.post<Todo>(this.apiUrl, newTodo);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toggleCompleteTask(id: number): Observable<Todo> {
    return this.http.patch<Todo>(`${this.apiUrl}/${id}/complete`, {});
  }

  updateTask(id: number, title: string): Observable<Todo> {
    const updatedTodo = { title };
    return this.http.put<Todo>(`${this.apiUrl}/${id}`, updatedTodo);
  }
}
