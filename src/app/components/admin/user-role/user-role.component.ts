import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

export interface PeriodicElement {
  name: string;
  description: string;
}
@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})
export class UserRoleComponent implements OnInit {
  _id: string;
  showUpdate:boolean = false;
  isCreated:boolean = false;

  roleForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });

  RoleInfoTable : PeriodicElement[] = [];
  displayedColumns: string[] = ['name', 'update', 'delete'];
  dataSource = new MatTableDataSource(this.RoleInfoTable);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private route: Router, private service: ApiService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.service.getRoleList().subscribe(res => {
      this.RoleInfoTable = res.data;
      this.dataSource.data = this.RoleInfoTable;
      console.log(res);
    }, (err) => {
      console.log(err);
    });

    this.roleForm =  new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
  });

  }

  UpdateButtonUser(id: string) {
    this._id = id;
    this.service.getRoleById(id).subscribe(res => {
      this.roleForm.setValue({
        name: res.name,
        description: res.description
      });
      this.showUpdate = true;
    });
  }

  deleteUserById(id: string) {
    this.service.postDeleteRoleById(id)
    .subscribe(res => {
      this.ngOnInit();
      console.log(res);
    })
  }
  UpdateUserById(){
    this.service.postUpdateRoleById(this._id, this.roleForm.value)
    .subscribe(res => {
      this.resetForm();
      // console.log('updated');
    })
  }

  onSubmit() {
    if (this.roleForm.invalid) {
      return;
  }

  this.service.postCreateList(this.roleForm.value)
  .subscribe(res => {
    this.ngOnInit();
    this.roleForm.reset();
    this.isCreated = true;
  }, (err) => {
    console.log(err);
  });
  }

  resetForm() {
    this.roleForm.reset();
    this.showUpdate = false;
  }
}
