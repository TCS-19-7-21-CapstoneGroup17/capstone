// service class for shopping cart
// will include HTTP calls to products API

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';
import { Ticket } from './ticket';

@Injectable({
  providedIn: 'root'
})
export class EditCartService {

  // DI for HTTPClient to do HTTP requests
  constructor(public http: HttpClient) { }

  // input: takes in no parameters
  // output: returns result of a HTTP call to API
  getAllProducts(): Observable<any> {
    return this.http.get("http://localhost:9090/product/getAllProducts");
  }

  getOneProduct(pName: string): Observable<any>{
    return this.http.get("http://localhost:9090/product/getProduct/" + pName);
  }

  // send ticket to unlock user account
  sendTicket(ticket: Ticket): Observable<any>{
    return this.http.post("http://localhost:9090/ticket/addTicket", ticket);
  }

  // given an array of products, display products in a grid
  displayProducts(productArray: Array<Product>) {
    console.log("Using service class, display products");
    for (let pp of productArray) {
      console.log(pp.productName);

      let columnDiv = document.createElement('div');
      columnDiv.className = 'col-3';
      columnDiv.id = "columns";
      columnDiv.style.cssText = "border: 1px solid black";

      columnDiv.innerHTML = `
        <div class="card">
          <img class="card-img-top" src="${pp.image}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${pp.productName} </h5>
            <div>
                <p>Price: ${pp.price} </p>
                <p>Quantity: ${pp.quantity} </p>
            </div>
            <div id="buttons">
            </div>
          </div>
        </div>
      `;

      let addButton = document.createElement('button');
      addButton.innerText = "Add";
      addButton.addEventListener('click', (e) => {
        this.addToCart(pp.productName);
      })
      columnDiv.appendChild(addButton);

      let deleteButton = document.createElement('button');
      deleteButton.innerText = "Delete";
      deleteButton.addEventListener('click', (e) => {
        this.deleteFromCart(pp.productName);
      })
      columnDiv.appendChild(deleteButton);

      document.getElementById("rows")?.appendChild(columnDiv);
    }
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
