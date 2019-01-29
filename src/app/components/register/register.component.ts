import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
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
    role: new FormControl('')
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private auth: AuthService, private service: ApiService) { }
  roleList = [];
  isRegistered:boolean = false;

  ngOnInit() {
    this.service.getRoleList().subscribe(res => {
      let roleData = res.data
      this.roleList =  roleData.filter(el => el.name !== 'admin' && el.name !== 'Admin');
    });
    this.signupForm =  new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      first_name: new FormControl(null, [Validators.required]),
      last_name: new FormControl(null, [Validators.required]),
      role: new FormControl(null, [Validators.required])
  });
  }
  onSubmit() {
    if (this.signupForm.invalid) {
      return;
  }
  const thisValue = this.signupForm.value;
  let role_name;
  this.roleList.forEach(item => {
    if(thisValue.role === item._id) {
      role_name = item.name
    }

  })
  const formData = {
    username: thisValue.username,
    password: thisValue.password,
    email: thisValue.email,
    last_name: thisValue.last_name,
    first_name: thisValue.first_name,
    user_type: thisValue.user_type,
    role_name: role_name,
    role_id: thisValue.role
  }
  this.auth.postRegister(formData)
  .subscribe(res => {
    // console.log(res.token);
    this.isRegistered = true;
    this.signupForm.reset();
    // this.router.navigate(['/admin/dashboard']);
  }, (err) => {
    console.log(err);
  });
  console.log(this.signupForm.value);
  }

}
