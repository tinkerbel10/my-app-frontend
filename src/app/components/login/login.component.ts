import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private service: AuthService,
              private toastr: ToastrService) { }

  public showLogin:boolean = true;
  public showRegistration:boolean = false;

  ngOnInit() {
    const is_verifiedParam: string = this.route.snapshot.queryParamMap.get('is_verified');
    const user_id: string = this.route.snapshot.queryParamMap.get('id');
    if(is_verifiedParam && user_id) {
      this.service.postVerifiedEmail(user_id, {
        is_verified: true
      }).subscribe(res => {
        this.isEmailVerified = true
      })
    }
    this.loginForm =  new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
  });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
  }
  const loginForm = this.loginForm.value;
    this.service.postLogin(loginForm)
    .subscribe(res => {
      if(res.role === 'admin') {
        this.router.navigate(['/admin/dashboard']);
      } else if(res.role === 'employee') {
        this.router.navigate(['/employee/dashboard']);
      } else {
        this.toastr.warning("Invalid User type!", "Warning");
      }
    }, (err) => {
      this.toastr.error("Invalid Username or password", "");
    });
    this.showLogin = true;
    this.showRegistration = false;
  }

  toggleLogin() {
    this.isShowLogin(true);
  }

  toggleRegistration() {
    this.isShowLogin(false);
  }

  get form() { return this.loginForm.controls; }

  isShowLogin(value: boolean) {
    this.showLogin = value;
    this.showRegistration = !value;
  }
}
