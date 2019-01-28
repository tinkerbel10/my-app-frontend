import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { ApiService } from '../../../service/api.service';
import { Role } from 'src/app/components/service/role.model';

export interface PeriodicElement {
  username: string;
  last_name: string;
  first_name: string;
  email: string;
  id: string;
}


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  showUpdate:boolean = false;
  isRegistered:boolean = false;
  roleList = [];
  _id: string;
  // password: string;

  CustomerInfoTable : PeriodicElement[] = [];
  displayedColumns: string[] = ['username', 'last_name', 'first_name', 'email', 'update', 'delete'];
  dataSource = new MatTableDataSource(this.CustomerInfoTable);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  signupForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    role: new FormControl('')
  });

  constructor( private userService: AuthService, private route: Router, private service: ApiService) { }

  ngOnInit() {
  
    this.dataSource.paginator = this.paginator;
    
    this.userService.getUsers().subscribe(res => {
      this.CustomerInfoTable = res.data;
      this.dataSource.data = this.CustomerInfoTable;
      console.log(res);
    }, (err) => {
      console.log(err);
    });

    this.signupForm =  new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      first_name: new FormControl(null, [Validators.required]),
      last_name: new FormControl(null, [Validators.required]),
      role: new FormControl(null)
  });

  this.service.getRoleList().subscribe(res => {
    this.roleList = res.data;
  });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
  }
  this.userService.postRegister(this.getFormValue())
  .subscribe(res => {

    // console.log(res.token);
    // this.route.navigate(['/admin/dashboard']);

    console.log('success');
    this.ngOnInit();
    this.signupForm.reset();
    this.isRegistered = true;
  }, (err) => {
    console.log(err);
  });
  }

  UpdateButtonUser(id: string) {
    this.userService.getUserById(id).subscribe(res => {
      this.signupForm.setValue({
        email: res.email,
        username: res.username,
        first_name: res.first_name,
        last_name:res.last_name,
        role: res.role_id,
        password: 'password'

      });
      this._id = id;
      // this.signupForm.value.role.name = res.role_name;
      // this.password =  res.password;
      this.showUpdate = true;
    });
  }


  compareFn(c1: any, c2:any):boolean {
    return c1&& c2 ? c1.id === c2.id : c1 === c2
  }

  UpdateUserById() {
    // console.log(123, this._id);
    this.userService.updateUseById(this._id, this.getFormValue())
    .subscribe(res => {
      this.ngOnInit();
    });
  }
  deleteUserById(id: string) {
    this.userService.deleteUserById(id)
    .subscribe(res => {
      this.ngOnInit();
    })
  }

  resetForm() {
    this.signupForm.reset();
    this.showUpdate = false;
  }

  getFormValue() {
    const thisValue = this.signupForm.value;
    let role_name;
    this.roleList.forEach(item => {
      if(thisValue.role === item._id) {
        role_name = item.name
      }

    })
    return {
      username: thisValue.username,
      password: thisValue.password,
      email: thisValue.email,
      last_name: thisValue.last_name,
      first_name: thisValue.first_name,
      user_type: thisValue.user_type,
      role_name: role_name,
      role_id: thisValue.role
    }
  }

}
