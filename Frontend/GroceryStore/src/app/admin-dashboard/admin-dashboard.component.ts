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

  addProductRef = new FormGroup({
    pName: new FormControl(),
    price: new FormControl(),
    quantity: new FormControl(),
    image: new FormControl()
  });

  constructor(public adminSer:AdminService,
    public router:Router) { }

  ngOnInit(): void {
  }

  addProduct() {
    let product = this.addProductRef.value;
    this.adminSer.addProduct(product).
    subscribe(result=>{
      if(result=="Success"){
        //this.router.navigate(["admin-home",login.username]);
      }else {
          //this.msg = result;
      }
    },
    error=>console.log(error));
    this.loginRef.reset();
  }

}
