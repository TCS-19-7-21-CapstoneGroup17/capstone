import { Component, OnInit } from '@angular/core';
import { EditCartService } from './edit-cart.service';
import { interval } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  // variables
  userID?: number

  constructor(public editCartSer: EditCartService, public router: Router) {
    
   }

  ngOnInit(): void {
    this.userID = this.editCartSer.getUserID();
    console.log("In customer.component.ts userID is " + this.userID);
    interval(1000).subscribe(x => this.userID = this.editCartSer.getUserID())
  }

  logout() {
    localStorage.setItem("userID", JSON.stringify(-1));
    this.router.navigate(["user/signup"]);
  }

}
