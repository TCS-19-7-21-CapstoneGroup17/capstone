// service class for shopping cart
// will include HTTP calls to products API

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditCartService {

  // DI for HTTPClient to do HTTP requests
  constructor(public http: HttpClient) { }

  // input: takes in no parameters
  // output: returns result of a HTTP call to API
  displayAllProducts(): Observable<any> {
    return this.http.get("http://localhost:9090/product/getAllProducts");
  }
}
