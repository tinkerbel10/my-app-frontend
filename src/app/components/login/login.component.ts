import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  username:string='';
  password:string='';
  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });

  }
  submit() {
    if (this.loginform.valid) {
      console.log(this.loginform.value);
    } else {
      console.log('error');
    }
  }
}
