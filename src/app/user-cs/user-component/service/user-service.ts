import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../models/models';

@Injectable({
  providedIn: 'root'
})
export class UserService 
{
  private baseUrl: string="http://localhost:1000/user/user"
  constructor(private http: HttpClient) { }

  createUser(user: User) : Observable<User>
  {
    return this.http.post<User>(`${this.baseUrl}`, user);
  }

  updateUserById(id: number, user: User) : Observable<User>
  {
    return this.http.put<User>(`${this.baseUrl}/${id}`, user);
  }

  getAllUsers() : Observable<User[]>
  {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  deleteUserById(id: number) : Observable<void>
  {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getUserById(id: number) : Observable<User>
  {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
}
