import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  

  // DI to edit-cart.service.ts to use service class's functions
  constructor() { }

  // on initialization, getAllProducts from the database
  ngOnInit(): void {
    
  }
}
