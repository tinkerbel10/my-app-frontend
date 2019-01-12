import { Injectable } from '@angular/core';
import { Login } from './login.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  formData  : Login;
  list: Login[];
  readonly rootURL ="http://localhost:3000/users";

  constructor(private http : HttpClient) { }

  postLogin(formData : Login){
   return this.http.post(this.rootURL+'/login', formData);
  }
  getProfile(){
    return this.http.get(this.rootURL + '/profile');
  }
}
