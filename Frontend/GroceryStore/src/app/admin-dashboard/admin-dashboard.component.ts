import { AdminService } from './../admin/admin.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  addProductRef = new FormGroup({
    pName: new FormControl(),
    price: new FormControl(),
    quantity: new FormControl(),
    image: new FormControl()
  });
  updateProductRef = new FormGroup({
    pName: new FormControl(),
    price: new FormControl(),
    quantity: new FormControl()
  })
  deleteProductRef = new FormGroup({
    pName: new FormControl()
  })
  generateReportRef = new FormGroup({
    timeFilter: new FormControl("", Validators.required),
    orderFilter: new FormControl("", Validators.required)
  })

  constructor(public adminSer: AdminService,
    public router: Router) { }

  ngOnInit(): void {
  }

  // function to toggle between components
  component?: string
  showComponent(compo: string) {
    this.component = compo;
  }


  addProduct() {
    let product = this.addProductRef.value;
    this.adminSer.addProduct(product).
      subscribe(result => {
        if (result == "Success") {
          //this.router.navigate(["admin-home",login.username]);
        } else {
          //this.msg = result;
        }
      },
        error => console.log(error));
    this.addProductRef.reset();
  }
  updateProduct() {
    let product = this.updateProductRef.value;
    this.adminSer.updateProduct(product).
      subscribe(result => {
        if (result == "Success") {
          //this.router.navigate(["admin-home",login.username]);
        } else {
          //this.msg = result;
        }
      },
        error => console.log(error));
    this.updateProductRef.reset();
  }
  deleteProduct() {
    let product = this.deleteProductRef.value;
    this.adminSer.deleteProduct(product).
      subscribe(result => {
        if (result == "Success") {
          //this.router.navigate(["admin-home",login.username]);
        } else {
          //this.msg = result;
        }
      },
        error => console.log(error));
    this.deleteProductRef.reset();
  }

  // generate report functions
  time?: string
  chooseTime(e: any) {
    console.log(e.target.value);
    this.time = e.target.value;
  }

  filter?: string
  chooseFilter(e: any) {
    console.log(e.target.value);
    this.filter = e.target.value;
  }


}
