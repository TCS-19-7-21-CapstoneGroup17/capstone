import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  errorMsg: string = ""

  // DI to edit-cart.service.ts to use service class's functions
  constructor(public editCartSer: EditCartService, public router: Router) {
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
    let userID = this.editCartSer.getUserID();
    let totalCost = 0;

    // if user has their shopping cart in localStorage
    if (localStorage.getItem(JSON.stringify(userID))) {
      this.shoppingCart = JSON.parse(localStorage.getItem(JSON.stringify(userID)) || "");
      for (let idx in this.shoppingCart) {
        // product[0] == ALL details about product (from db)
        // shoppingCart[idx] == productName + quantity in cart
        // for each product in the shopping cart, get the full details of it
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
            status: "processing"
          }
          // add order to Order table
          this.editCartSer.addOrder(order).subscribe(orderRes => {
            // if successfully add to Order table ... 
            console.log(orderRes);
            if (orderRes.result) {
              let prodQuan = {
                productName: this.shoppingCart[idx].productName,
                quantity: product[0].quantity - this.shoppingCart[idx].quantity
              };
              // update product quantity in Product table
              this.editCartSer.updateProductQuantity(prodQuan).subscribe(updateQuantityRes => {
                // if successfully updated product quantity ... 
                if (updateQuantityRes.result) {
                  totalCost += this.shoppingCart[idx].quantity * product[0].price;
                  if (parseInt(idx) == this.shoppingCart.length - 1) {
                    // update funds in User table
                    this.editCartSer.updateFunds({ userID: userID, totalCost: totalCost }).subscribe(updateFundRes => {
                      // if successfully deduct totalCost from fund, clear shopping cart
                      if (updateFundRes) {
                        this.shoppingCart = []
                        localStorage.setItem(JSON.stringify(userID), JSON.stringify(this.shoppingCart));
                        //go back to store page
                        alert("Checkout successful. Total:" + totalCost);
                        this.router.navigate(["user/add-groceries"]);
                      }
                      else {
                        console.log(updateFundRes.msg)
                        alert(updateFundRes.msg);
                      }
                    })
                  }
                }
                else {
                  console.log(updateQuantityRes.msg);
                  alert(updateQuantityRes.msg);
                }
              })
            }
            else {
              console.log(orderRes.msg);
              alert(orderRes.msg);
            }
          })
        })
      }
    }
  }

}
