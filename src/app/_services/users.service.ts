import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { TokenStorageService } from './token-storage.service';

const apiURL = 'http://localhost:8080/api/users/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public apiURL = 'http://localhost:8080/api/users/';

  id? : number;

  constructor(private http: HttpClient,private auth: TokenStorageService) { }

  listeUser():  Observable<User[]>{
    return this.http.get<User[]>(apiURL+ 'admin',httpOptions);
  }
  register(username: string, email: string, password: string, service:string, departement:string, telFixe:string, telMobile:string, roles:any): Observable<any> {
    const r = []
    r.push(roles)
    console.log(r)
    return this.http.post(apiURL + 'create', {
      username,
      email,
      password,
      role:r
    }, httpOptions);
  }
  public deleteUser(id?: number) : Observable<Object>{
    return this.http.delete<object>(`${this.apiURL}delete/${id}`);
  }
  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiURL}update/${this.id}`, user);
  }
  public addUsersToLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }
  updateUserr(user: User) :Observable<User>{
    return this.http.put<User>(this.apiURL+'update/'+user.id, user )
  }
 
  getId(getId?: number){
    this.id = getId;
  }
  
  getEmployeeById():Observable<Object>{
    return this.http.get<Object>(`${this.apiURL}find/${this.id}`);
  }
  getById(id:any):Observable<Object>{
    return this.http.get<Object>(`${this.apiURL}find/${id}`);
  }
  findByTitle(username:any) : Observable<User[]>{
    return this.http.get<User[]>(`${this.apiURL}?username=${username}`);
  }
}
