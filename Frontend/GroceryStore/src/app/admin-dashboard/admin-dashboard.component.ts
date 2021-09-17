import { AdminService } from './../admin/admin.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  addMsg:string = "";
  addError:string = "";
  updateMsg:string = "";
  updateError:string = "";
  deleteMsg:string = "";
  deleteError:string = "";

  addProductRef = new FormGroup({
    productName: new FormControl(),
    price: new FormControl(),
    quantity: new FormControl(),
    image: new FormControl()
  });
  updateProductRef = new FormGroup({
    productName: new FormControl(),
    price: new FormControl(),
    quantity: new FormControl()
  })
  deleteProductRef = new FormGroup({
    productName: new FormControl()
  })

  constructor(public adminSer: AdminService,
    public router: Router) { }

  ngOnInit(): void {
  }

  addProduct() {
    this.addMsg = "";
    this.addError = "";
    let product = this.addProductRef.value;
    this.adminSer.addProduct(product).
      subscribe(result => {
        if (result == "Product stored successfully") {
          this.addMsg = result;
        } else {
          this.addError = result;
        }
      },
        error => console.log(error));
    this.addProductRef.reset();
  }
  updateProduct() {
    this.updateMsg="";
    this.updateError="";
    let product = this.updateProductRef.value;
    console.log(product);
    this.adminSer.updateProduct(product).
      subscribe(result => {
        console.log(result);
        if (result.result) {
          this.updateMsg = result.msg;
        } 
        else {
          this.updateError = result.msg;  
        }
      },
        error => console.log(error));
    this.updateProductRef.reset();
  }
  deleteProduct() {
    this.deleteMsg="";
    this.deleteError="";
    let product = this.deleteProductRef.value;
    this.adminSer.deleteProduct(product).
      subscribe(result => {
        if (result.result) {
          this.deleteMsg = result.msg;
        } else {
          this.deleteError = result.msg;
        }
      },
        error => console.log(error));
    this.deleteProductRef.reset();
  }
}
