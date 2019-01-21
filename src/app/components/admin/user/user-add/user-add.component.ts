import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

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
  _id: string;

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
  });

  constructor( private service: AuthService, private route: Router) { }

  ngOnInit() {
  
    this.dataSource.paginator = this.paginator;
    
    this.service.getUsers().subscribe(res => {
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
  });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
  }
  this.service.postRegister(this.signupForm.value)
  .subscribe(res => {

    // console.log(res.token);
    // this.route.navigate(['/admin/dashboard']);

    console.log('success');
    this.signupForm.reset();
    this.isRegistered = true;
  }, (err) => {
    console.log(err);
  });
  // console.log(this.signupForm.value);
  }

  UpdateButtonUser(id: string) {
    this._id = id;
    this.service.getUserById(id).subscribe(res => {
      this.signupForm.setValue({
        email: res.email,
        username: res.username,
        first_name: res.first_name,
        last_name:res.last_name,
        password: ''

      });
      this.showUpdate = true;
    });
  }

  UpdateUserById() {
    console.log(123, this._id);
  }
  deleteUserById(id: string) {
    this.service.deleteUserById(id)
    .subscribe(res => {
      this.service.getUsers()
      console.log(res);
    })
  }

  resetForm() {
    this.signupForm.reset();
    this.showUpdate = false;
  }

}
