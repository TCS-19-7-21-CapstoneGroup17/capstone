import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from './model.admin';
import { Product } from '../employee/model.product';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  checkLoginDetails(admin:Admin):Observable<any>{
    return this.http.post("http://localhost:9090/admin/signin",admin)
  }
  addProduct(product:Product):Observable<any>{
    return this.http.post("http://localhost:9090/product/addProduct", product)
  }
  updateProduct(product:Product):Observable<any>{
    return this.http.post("http://localhost:9090/product/updateProduct", product)
  }
  deleteProduct(product:Product):Observable<any>{
    return this.http.post("http://localhost:9090/product/deleteProduct", product)
  }
}
