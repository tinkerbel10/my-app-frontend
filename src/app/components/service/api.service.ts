import { Injectable } from '@angular/core';
import { Login } from './login.model';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  formData  : Login;
}
