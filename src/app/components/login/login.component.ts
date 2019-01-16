import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;
  constructor(private router: Router, private formBuilder: FormBuilder, private service: ApiService) { }

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

    // console.log(this.loginForm.value.password);
    this.service.postLogin(this.loginForm.value)
    .pipe(first())
    .subscribe(res => {
      // console.log(res.token);
      this.router.navigate(['/admin/dashboard']);
      this.service.setLoggenInStatus(true);
    }, (err) => {
      console.log(err);
    });
  }
}
