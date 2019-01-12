import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private router: Router, private formBuilder: FormBuilder, private service: ApiService) { }

  ngOnInit() {
    this.loginForm =  new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
  });
  }
  onSubmit() {
    // console.log(this.loginForm.value.password);
    this.service.postLogin(this.loginForm.value).subscribe(res => {

      this.router.navigate(['/home']);
    }, (err) => {
      console.log(err);
    });
  }
}
