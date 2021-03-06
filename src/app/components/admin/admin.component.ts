import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { AuthService } from '../service/auth.service';

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
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private formBuilder: FormBuilder, private service: AuthService) { }
  public showUser:boolean = false;
  public showRole:boolean = false;
  public showUserServiceTransaction: boolean = true;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  onLogoutClick() {
  this.service.logout();
  this.router.navigate(['/login']);

  }

  toggleUSer() {
    this.showUser = true;
    this.showRole = false;
    this.showUserServiceTransaction = false;

  }
  toggleRole() {
    this.showRole = true;
    this.showUser = false;
    this.showUserServiceTransaction = false;
  }
  toggleServiceTransaction() {
    this.showUserServiceTransaction = true;
    this.showRole = false;
    this.showUser = false;

  }

}
