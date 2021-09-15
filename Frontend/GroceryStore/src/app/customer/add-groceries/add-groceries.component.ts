import { Component, OnInit } from '@angular/core';
import { EditCartService } from '../edit-cart.service';

@Component({
  selector: 'app-add-groceries',
  templateUrl: './add-groceries.component.html',
  styleUrls: ['./add-groceries.component.css', '../customer.component.css']
})
export class AddGroceriesComponent implements OnInit {
  // variables
  productsArray?: Array<any>

  constructor(public editCartSer: EditCartService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }


  getAllProducts() {
    // call service class's displayAllProducts function
    // store result in variable: productsArray
    this.editCartSer.displayAllProducts().subscribe(result => {
      this.productsArray = result;
    })
  }

  // input: product name
  // add product to shopping cart (stored in localStorage)
  addToCart(pName: string) {
    // get shopping cart from localStorage
    let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart") || "");
    console.log(shoppingCart); //delete
    function findProduct(product: any) { return product.productName == pName; }

    // if product is already in shopping cart, increment product quantity by 1
    // else, add product to shopping cart for the first time
    if (shoppingCart.find(findProduct)) {
      shoppingCart.find(findProduct).quantity += 1;
    } else {
      shoppingCart.push({ productName: pName, quantity: 1 });
    }
    // store updated shopping cart into localStorage
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  }

  // delete product from shopping cart
  deleteFromCart(pName: string) {
    let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart") || "");
    function findProduct(product: any) { return product.productName == pName; }

    // if product in shopping cart
    let foundProductIdx = shoppingCart.findIndex(findProduct);
    
    if (foundProductIdx >= 0) {
      if (shoppingCart[foundProductIdx].quantity == 1) {
        shoppingCart.splice(foundProductIdx, 1);
      }
      else if (shoppingCart[foundProductIdx].quantity > 1) {
        shoppingCart[foundProductIdx].quantity -= 1;
      }
      localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    }
    
    console.log(shoppingCart);
  }

}
