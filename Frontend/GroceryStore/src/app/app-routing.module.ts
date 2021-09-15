import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { SignInComponent } from './employee/sign-in/sign-in.component';

const routes: Routes = [
  {path:"dashboard",component:EmployeeComponent},
  {path:"signInEmployee", component:SignInComponent},
  {path:"", redirectTo:"signInEmployee",pathMatch:"prefix"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
