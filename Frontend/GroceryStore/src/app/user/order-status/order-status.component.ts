import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Order } from 'src/app/user/order';
import { UserService } from 'src/app/employee/user.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {

  userIDform = new FormGroup({
    userId:new FormControl(),
  });
  orderHistoryArray = [];
  tableContent = "";
  tableStart = "<table border=\"1\"><tr><th>Order ID</th><th>Product ID</th><th>Price</th><th>Date</th><th>Quantity</th><th>Status</th></tr>";
  tableEnd = "</table>"

  constructor(public user_service:UserService) { }

  ngOnInit(): void {
    
  }
  displayOrders(){
    let userId = this.userIDform.value;
    this.user_service.getOrderHistory(userId).
      subscribe(result => {
        this.orderHistoryArray = result;
        console.log(this.orderHistoryArray);
        this.orderHistoryArray.forEach((element: Order) => {
          console.log("loop")
          this.tableContent += "<tr><td>"+ element._id +"</td><td>"+ element.productId +"</td><td>"+ element.price +"</td><td>"+ element.date +"</td><td>"+ element.quantity +"</td><td>"+ element.status +"</td></tr>";
          console.log(this.tableContent);
        })
      document.getElementById("orderTable")!.innerHTML+= this.tableStart + this.tableContent + this.tableEnd;
      },
      error =>console.log(error));
  }
}
