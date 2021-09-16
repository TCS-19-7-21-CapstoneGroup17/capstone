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

  // need userID, totalCost, productName, productQuantity
  doCheckout() {
    console.log("doing checkout")

    let userID = this.editCartSer.getUserID();
    let totalCost = 0;

    // if user has their shopping cart in localStorage
    if (localStorage.getItem(JSON.stringify(userID))) {
      this.shoppingCart = JSON.parse(localStorage.getItem(JSON.stringify(userID)) || "");

      for (let idx in this.shoppingCart) {
        // for each product in the shopping cart, get the full details of it
        // product[0] == ALL details about product (from db)
        // shoppingCart[idx] == productName + quantity in cart
        this.editCartSer.getOneProduct(this.shoppingCart[idx].productName).subscribe(product => {
          let date = new Date();
          let order = {
            userId: userID,
            productName: this.shoppingCart[idx].productName,
            price: product[0].price,
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            quantity: this.shoppingCart[idx].quantity,
            status: "shipped"
          }
          this.editCartSer.addOrder(order).subscribe(orderRes => {
            // if successfully add to Order table ... 
            if (orderRes.result) {
              let prodQuan = {
                productName: this.shoppingCart[idx].productName,
                quantity: product[0].quantity - this.shoppingCart[idx].quantity
              };
              this.editCartSer.updateProductQuantity(prodQuan).subscribe(updateQuantityRes => {
                // if successfully updated product quantity ... 
                if (updateQuantityRes.result) {
                  totalCost += this.shoppingCart[idx].quantity * product[0].price;
                  if (parseInt(idx) == this.shoppingCart.length - 1) {
                    this.editCartSer.updateFunds({ userID: userID, totalCost: totalCost }).subscribe(updateFundRes => {
                      if (updateFundRes) {
                        this.shoppingCart = []
                        localStorage.setItem(JSON.stringify(userID), JSON.stringify(this.shoppingCart));
                      }
                      else {
                        console.log(updateFundRes.msg)
                      }
                    })
                  }
                }
                else {
                  console.log(updateQuantityRes.msg);
                }
              })
            }
            else {
              console.log(orderRes.msg);
            }
          })
        })
      }
    }
  }

}
