import { Router } from '@angular/router';
import { AdminService } from './admin.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductRequestService } from '../employee/product-request.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  loginRef = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(public adminSer: AdminService,
    public router: Router,
    public reqSer: ProductRequestService) { }
  msg?: string;
  ngOnInit(): void {
  }

  checkAdmin() {
    
    let login = this.loginRef.value;
    console.log(login);
    this.adminSer.checkLoginDetails(login).
      subscribe(res => {
        // console.log(result)
        // if (result == "Success") {
        //   this.router.navigate(["../admin-home"]);
        console.log(res);
        if (res == "Success") {
          //save admin login info in sessionStorage
          console.log("login")
          sessionStorage.setItem("admin", JSON.stringify(login));
          this.router.navigate(["admin/dashboard"]);
        } else {
          this.msg = res;
        }
      },
        error => console.log(error));
    this.loginRef.reset();
  }

  viewRequest() {
    this.reqSer.getRequest().
    subscribe(result=>{
      console.log(result);
    },
    error=>console.log(error));
  }
}
