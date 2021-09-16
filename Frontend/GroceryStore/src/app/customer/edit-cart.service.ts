// service class for shopping cart
// will include HTTP calls to products API

import { Injectable } from '@angular/core';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';
import { Ticket } from './ticket';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class EditCartService {

  // DI for HTTPClient to do HTTP requests
  constructor(public http: HttpClient) { }

  // input: takes in no parameters
  // output: returns all products from database
  getAllProducts(): Observable<any> {
    return this.http.get("http://localhost:9090/product/getAllProducts");
  }

  // input: takes in a product name
  // output: returns product with product name
  getOneProduct(pName: string): Observable<any>{
    return this.http.get("http://localhost:9090/product/getProduct/" + pName);
  }

  // input: ticket to unlock account {userID:number , reason:string}
  // add ticket to Ticket table
  // output: return JSON {result:boolean, msg:string}
  sendTicket(ticket: Ticket): Observable<any>{
    return this.http.post("http://localhost:9090/ticket/addTicket", ticket);
  }

  // input: user info from signup page { firstname, lastname, emailId, password, dob, phone, address }
  addUser(user: User): Observable<any> {
    return this.http.post("http://localhost:9090/user/signUp", user);
  }

  // input: user info from signin page {userID, password}
  checkSignIn(user: any): Observable<any>{
    return this.http.post("http://localhost:9090/user/signIn", user);
  }

  // input: checkout cost details {userID, totalCost of shopping cart}
  updateFunds(info: any): Observable<any>{
    return this.http.post("http://localhost:9090/user/updateFund", info);
  }

  // input: new product quantity {productName, newQuantity}
  updateProductQuantity(quantity: any): Observable<any>{
    return this.http.post("http://localhost:9090/product/updateProduct", quantity);
  }

  // input: order {userID, productName, price (per product), day, month, year, quantity, status}
  addOrder(order: any): Observable<any>{
    return this.http.post("http://localhost:9090/order/addOrder", order);
  }

  // input: none
  // output: number?
  getUserID(): number {
    let userID = localStorage.getItem("userID");
    if (userID) {
      return JSON.parse(userID);
    }
    // first time opening page. set userID == -1 (not logged in)
    else {
      localStorage.setItem("userID", JSON.stringify(-1))
      return -1;
    }
  }

  // given an array of products, display products in a grid
  displayProducts(productArray: Array<Product>) {
    let rowTag = document.getElementById('rows') || document.createElement('div');
    while (rowTag.firstChild) {
      rowTag.removeChild(rowTag.firstChild);
    }

    // for each product in shopping cart, display it
    for (let pp of productArray) {
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
    let userID = JSON.stringify(this.getUserID());
    // if shopping cart for this user already exists
    if (localStorage.getItem(userID)) {
      // get shopping cart from localStorage
      let shoppingCart = JSON.parse(localStorage.getItem(userID) || "");
      function findProduct(product: any) { return product.productName == pName; }

      // if product is already in shopping cart, increment product quantity by 1
      if (shoppingCart.find(findProduct)) shoppingCart.find(findProduct).quantity += 1;
      // else, add product to shopping cart for the first time
      else shoppingCart.push({ productName: pName, quantity: 1 });

      // store updated shopping cart into localStorage
      localStorage.setItem(userID, JSON.stringify(shoppingCart));
    }
    // create a shopping cart for them and add first item
    else {
      localStorage.setItem(userID, JSON.stringify([{productName: pName, quantity:1}]))
    }
    
  }

  // delete product from shopping cart
  deleteFromCart(pName: string) {
    // get userID and shopping cart from localStorage
    let userID = JSON.stringify(this.getUserID());
    let shoppingCart = JSON.parse(localStorage.getItem(userID) || "");
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
      localStorage.setItem(userID, JSON.stringify(shoppingCart));
    }
  }

}
