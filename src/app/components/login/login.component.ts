import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isUserValid:boolean = false;
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private service: AuthService) { }

  public showLogin:boolean = true;
  public showRegistration:boolean = false;

  ngOnInit() {
    this.loginForm =  new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
  });
  }

  get form() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
  }
  var loginForm = this.loginForm.value;

    // console.log(this.loginForm.value.password);
    this.service.postLogin(loginForm)
    .subscribe(res => {
      // console.log(res.token);
      this.router.navigate(['/admin/dashboard']);
    }, (err) => {
      this.isUserValid =true;
      console.log(err);
    });
  }

  toggleLogin() {
    this.showLogin = true;
    this.showRegistration = false;
  }

  toggleRegistration() {
    this.showRegistration = true;
    this.showLogin = false;
  }
}
