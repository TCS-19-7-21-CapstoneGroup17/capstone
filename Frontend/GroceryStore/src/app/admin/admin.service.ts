import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from './admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  checkLoginDetails(admin:Admin):Observable<any>{
    return this.http.post("http://localhost:9090/admin/signin",admin)
  }
}
