import { Injectable } from '@angular/core';
import { Login } from './login.model';
import { Role } from './role.model';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  formRoleData: Role;

  readonly rootURL ="http://localhost:3000/";

  postCreateList(formRoleData) {
    return this.http.post(this.rootURL + 'role/', formRoleData);
  }
  getRoleList() {
    return this.http.get<any>(this.rootURL + 'role/');
  }
  getRoleById(id) {
    return this.http.get<any>(this.rootURL + 'role/' + id);
  }
  postDeleteRoleById(id) {
    return this.http.delete<any>(this.rootURL + 'role/' + id);
  }
  postUpdateRoleById(id, formRoleData) {
    return this.http.post(this.rootURL + 'role/' + id, formRoleData);
  }
}
