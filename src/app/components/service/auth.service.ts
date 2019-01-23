import { Injectable } from '@angular/core';
import { Login } from './login.model';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private loggedInStatus = false;

  constructor(private http : HttpClient) { }

  formData  : Login;
  list: Login[];
  readonly rootURL ="http://localhost:3000/users";

//   public get currentUserValue(): User {
//     return this.currentUserSubject.value;
// }

  setLoggenInStatus(value: boolean) {
    this.loggedInStatus = value;
  }


 get isLoggedIn() {
   return this.loggedInStatus;
 }

  postLogin(formData : Login){
  //  return this.http.post<any>(this.rootURL + '/login', formData);
  //  return this.http.post(this.rootURL+'/login', formData);
  return this.http.post<any>(this.rootURL+'/login', formData)
        .pipe(map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              // this.currentUserSubject.next(user);
          }

          return user;
      }));
  }


  postRegister(formData) {
    return this.http.post<any>(this.rootURL+'/signup', formData);
  }

  getProfile(){
    return this.http.get(this.rootURL + '/profile', {
      withCredentials: true  // <=========== important!
    });
  }

  getUsers() {
    return this.http.get<any>(this.rootURL + '/all');
  }
  getUserById(id) {
    return this.http.get<any>(this.rootURL + '/' + id);
  }
  updateUseById(id, formData) {
    return this.http.post<any>(this.rootURL + '/' + id , formData);
  }
  deleteUserById(id) {
    return this.http.delete(this.rootURL + '/' + id);
  }
}
