import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-sign-in2',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent2 implements OnInit {

  employeeLoginRef = new FormGroup({
    _id:new FormControl(),
    password:new FormControl()
  });

  constructor(public employee_service:EmployeeService,
    public router:Router) { }

  msg?:string

  ngOnInit(): void {
  }

  checkEmployee() {
    let employeeLogin = this.employeeLoginRef.value;
    console.log(employeeLogin);
    this.employee_service.sendCredentials(employeeLogin).
    subscribe(result => {
      console.log(result)
      if(result.result){
        this.router.navigate(["dashboard",employeeLogin._id]);
      }else{
        this.msg = result.msg;
      }
    },
    error=>console.log(error));
    this.employeeLoginRef.reset();
  }
}


