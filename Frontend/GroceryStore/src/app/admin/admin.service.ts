import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from './model.admin';
import { Product } from '../employee/model.product';
import { Request } from '../employee/model.request';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public http:HttpClient) { }

  checkLoginDetails(admin:Admin):Observable<any>{
    return this.http.post("http://localhost:9090/admin/signIn",admin)
  }
  // checkLoginDetails(admin:Admin):Observable<any>{
  //   return this.http.post("http://localhost:4200/api/admin/signin",admin)
  // }
  addProduct(product:Product):Observable<any>{
    return this.http.post("http://localhost:9090/product/addProduct", product, {responseType:'text'})
  }
  updateProduct(product:Product):Observable<any>{
    return this.http.post("http://localhost:9090/product/updateProduct", product)
  }
  deleteProduct(product:Product):Observable<any>{
    return this.http.post("http://localhost:9090/product/deleteProduct", product)
  }
  addEmployee(employee:any):Observable<any> {
    return this.http.post("http://localhost:9090/employee/addEmployee", employee);
  }
  deleteEmployee(employee:any):Observable<any> {
    return this.http.post("http://localhost:9090/employee/deleteEmployee", employee);
  }
  // viewRequest():Observable<any>{
  //   return this.http.get("")
  // }
  getYearlyReport(report: any): Observable<any> {
    return this.http.post("http://localhost:9090/order/yearlyReport", report);
  }
  getMonthlyReport(report: any): Observable<any>{
    return this.http.post("http://localhost:9090/order/monthlyReport", report)
  }
  getWeeklyReport(report: any): Observable<any> {
    return this.http.post("http://localhost:9090/order/weeklyReport", report)
  }
  getDailyReport(report: any): Observable<any> {
    return this.http.post("http://localhost:9090/order/dailyReport", report)
  }
}
