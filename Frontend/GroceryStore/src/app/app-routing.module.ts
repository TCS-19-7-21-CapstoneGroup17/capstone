import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { SignInComponent } from './employee/sign-in/sign-in.component';
import { OrderStatusComponent } from './user/order-status/order-status.component';

const routes: Routes = [
  {path:"dashboard/:empId",component:EmployeeComponent},
  {path:"employeeSignin", component:SignInComponent},
  {path:"userOrderStatus", component:OrderStatusComponent},
  //should be set to home or index page
  {path:"", redirectTo:"employeeSignin",pathMatch:"prefix"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
