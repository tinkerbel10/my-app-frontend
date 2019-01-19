import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private service: AuthService) { }

  ngOnInit() {
    this.signupForm =  new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      first_name: new FormControl(null, [Validators.required]),
      last_name: new FormControl(null, [Validators.required]),
  });
  }
  onSubmit() {
    if (this.signupForm.invalid) {
      return;
  }
  this.service.postRegister(this.signupForm.value)
  .subscribe(res => {
    // console.log(res.token);
    this.signupForm.reset();
    this.router.navigate(['/admin/dashboard']);
  }, (err) => {
    console.log(err);
  });


  console.log(this.signupForm.value);
  }

}
