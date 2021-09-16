import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/employee/user.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {

  constructor(public user_service:UserService) { }

  tableContent = "";
  tableStart = "<table border=\"1\"><tr><th>Order ID</th><th>Product ID</th><th>Price</th><th>Date</th><th>Quantity</th><th>Status</th></tr>";
  tableEnd = "</table>"

  ngOnInit(): void {
    this.user_service.getOrderHistory().
    subscribe(result => {
      console.log(result);
      result.forEach((element: { _id: number; productId: number; price: number; date: string; quantity: number; status: string; }) => {
        this.tableContent += "<tr><td>"+ element._id +"</td><td>"+ element.productId +"</td><td>"+ element.price +"</td><td>"+ element.date +"</td><td>"+ element.quantity +"</td><td>"+ element.status +"</td></tr>";
      })
    },
    error =>console.log(error));
    document.getElementById("orderTable")!.innerHTML+= this.tableStart + this.tableContent + this.tableEnd;
  }

}
