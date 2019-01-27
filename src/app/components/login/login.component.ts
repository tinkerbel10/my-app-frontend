import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showAuth:boolean = true;
  isUserValid:boolean = false;
  isEmailVerified:boolean = false;
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private service: AuthService) { }

  public showLogin:boolean = true;
  public showRegistration:boolean = false;

  ngOnInit() {
    const is_verifiedParam: string = this.route.snapshot.queryParamMap.get('is_verified');
    const user_id: string = this.route.snapshot.queryParamMap.get('id');
    // console.log(1243, is_verifiedParam);
    // console.log(1243, use_id);
    if(is_verifiedParam && user_id) {
      this.service.postVerifiedEmail(user_id, {
        is_verified: true
      }).subscribe(res => {
        // console.log(res);
        this.isEmailVerified = true
      })
    }
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
      if(res.role === 'admin') {
        this.router.navigate(['/admin/dashboard']);
      } else if(res.role === 'employee') {
        this.router.navigate(['/employee/dashboard']);
      } else {
        console.log('Either admin or employee only')
      }
      // console.log(res.token);

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
