import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/employee/user.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {

  constructor(public user_service:UserService) { }

  ngOnInit(): void {
  }

}
