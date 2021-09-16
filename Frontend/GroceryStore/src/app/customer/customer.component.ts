import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  // variables
  clicked_AddGroceries: boolean = true;
  clicked_ViewShoppingCart: boolean = false;

  
  constructor() { }

  ngOnInit(): void {
  }

  showAddGroceries() {
    this.clicked_AddGroceries = true;
    this.clicked_ViewShoppingCart = false;
  }

  showViewShoppingCart() {
    this.clicked_AddGroceries = false;
    this.clicked_ViewShoppingCart = true;
  }

}
