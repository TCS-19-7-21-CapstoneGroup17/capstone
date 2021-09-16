import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  employeeLoginRef = new FormGroup({
    empId:new FormControl(),
    password:new FormControl()
  });

  constructor(public employee_service:EmployeeService,
    public router:Router) { }

  msg?:string

  ngOnInit(): void {
  }

  checkEmployee() {
    let employeeLogin = this.employeeLoginRef.value;
    this.employee_service.sendCredentials(employeeLogin).
    subscribe(result => {
      if(result == "Success"){
        this.router.navigate(["dashboard",employeeLogin.empId]);
      }else{
        this.msg = result;
      }
    },
    error=>console.log(error));
    this.employeeLoginRef.reset();
  }
}


