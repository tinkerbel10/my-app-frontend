import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

export interface PeriodicElement {
  // name: string;
  // position: number;
  // weight: number;
  // symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  signupForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
  });

  constructor( private service: AuthService, private route: Router) { }

  public showUser:boolean = false;

  ngOnInit() {
  
    this.dataSource.paginator = this.paginator;
    
    this.service.getProfile().subscribe(res => {
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
  }, (err) => {
    console.log(err);
  });


  console.log(this.signupForm.value);
  }

  toggleUSer() {
    this.showUser = !this.showUser;
  }
}
