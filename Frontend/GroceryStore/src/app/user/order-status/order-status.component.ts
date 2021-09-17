import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Order } from 'src/app/user/order';
import { UserService } from 'src/app/employee/user.service';
import { EditCartService } from 'src/app/customer/edit-cart.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {

  // userIDform = new FormGroup({
  //   userId:new FormControl(),
  // });
  userId?:number;
  orderHistoryArray = [];
  tableContent = "";
  tableStart = "<table class=\"table\"><thead class=\"thead-dark\"><tr><th>Order ID</th><th>Product Name</th><th>Price</th><th>Day</th><th>Month</th><th>Year</th><th>Quantity</th><th>Status</th></thead></tr>";
  tableEnd = "</table>"

  constructor(public user_service:UserService, public cart_service:EditCartService) { }

  ngOnInit(): void {
    this.userId= this.cart_service.getUserID();
    this.user_service.getOrderHistory(this.userId).
      subscribe(result => {
        this.orderHistoryArray = result;
        console.log(this.orderHistoryArray);
        this.orderHistoryArray.forEach((element: Order) => {
          console.log("loop")
          this.tableContent += "<tr><td>"+ element._id +"</td><td>"+ element.productName +"</td><td>"+ element.price +"</td><td>"+ element.day +"</td><td>" + element.month +"</td><td>"+ element.year +"</td><td>" + element.quantity +"</td><td>"+ element.status +"</td></tr>";
          console.log(this.tableContent);
        })
      document.getElementById("orderTable")!.innerHTML+= this.tableStart + this.tableContent + this.tableEnd;
      },
      error =>console.log(error));
  }
  // displayOrders(){
  // }
}
