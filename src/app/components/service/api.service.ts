import { Injectable } from '@angular/core';
import { Login } from './login.model';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  readonly rootURL ="http://localhost:3000";

  getRoleList() {
    return this.http.get<any>(this.rootURL + '/role/');
  }
}
