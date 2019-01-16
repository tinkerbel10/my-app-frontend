import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  // productForm: FormGroup;
  // prod_name:string='';
  // prod_desc:string='';
  // prod_price:number=null;
  // isLoadingResults = false;

  constructor(private router: Router, private formBuilder: FormBuilder) { }
  public showUser:boolean = false;
  ngOnInit() {
    // this.productForm = this.formBuilder.group({
    //   'prod_name' : [null, Validators.required],
    //   'prod_desc' : [null, Validators.required],
    //   'prod_price' : [null, Validators.required]
    // });
  }
  // onFormSubmit(form:NgForm) {
  //   this.isLoadingResults = true;
  //   console.log(form.value);
  // }

  toggleUSer() {
    this.showUser = !this.showUser;
  }

}
