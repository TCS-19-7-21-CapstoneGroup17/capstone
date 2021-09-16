import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { EditCartService } from '../edit-cart.service';
import { Product } from '../product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css', '../customer.component.css']
})
export class ShoppingCartComponent implements OnInit {
  // variables
  shoppingCart: Array<any> = []
  shoppingArray: Array<Product> = []
  timerInterval: any
  // DI to edit-cart.service.ts to use service class's functions
  constructor(public editCartSer: EditCartService) {
  }

  // on initialization, getAllProducts from the database
  ngOnInit(): void {
    this.displayCartProducts();
  }

  // get the shopping cart products from localStorage
  // for each item in the shopping cart, get the product info (but quantity from localStorage)
  // call service class's function to display shopping cart
  displayCartProducts() {
    let userID = JSON.stringify(this.editCartSer.getUserID());
    // if shopping cart for user exists in localStorage
    if (localStorage.getItem(userID)) {
      this.shoppingCart = JSON.parse(localStorage.getItem(userID) || "");
      // for each item in the shopping cart, get the product info (but quantity from localStorage)
      for (let idx in this.shoppingCart) {
        this.editCartSer.getOneProduct(this.shoppingCart[idx].productName).subscribe(result => {
          // convert the {productName, quantity} in localStorage into {productName, price, quantity, image}
          this.shoppingArray.push({
            productName: this.shoppingCart[idx].productName,
            price: result[0].price,
            quantity: this.shoppingCart[idx].quantity,
            image: result[0].image
          })

          // on the last loop, display the shopping cart products 
          if (parseInt(idx) == this.shoppingCart.length - 1) {
            this.editCartSer.displayProducts(this.shoppingArray);
          }

        });
      }
    }
    // else no shopping cart in localStorage. don't display any products

  }


}
