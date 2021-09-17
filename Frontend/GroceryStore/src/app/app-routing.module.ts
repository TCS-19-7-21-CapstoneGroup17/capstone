import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { AppComponent } from './app.component';
import { AddGroceriesComponent } from './customer/add-groceries/add-groceries.component';
import { CustomerComponent } from './customer/customer.component';
import { RaiseTicketComponent } from './customer/raise-ticket/raise-ticket.component';
import { ShoppingCartComponent } from './customer/shopping-cart/shopping-cart.component';
import { SignInComponent } from './customer/sign-in/sign-in.component';
import { SignUpComponent } from './customer/sign-up/sign-up.component';
import { OrderStatusComponent } from './user/order-status/order-status.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { FundsComponent } from './user/funds/funds.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent2 } from './employee/sign-in/sign-in.component';

const routes: Routes = [
  {
    path: 'user',
    component: CustomerComponent,
    children: [
      { path: 'signup', component: SignUpComponent },
      { path: 'signin', component: SignInComponent },
      { path: 'add-groceries', component: AddGroceriesComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'raise-ticket', component: RaiseTicketComponent },
      { path: 'order-status', component: OrderStatusComponent},
      { path: 'edit-profile', component: EditProfileComponent},
      { path: 'funds', component: FundsComponent},
      { path: '', redirectTo: 'signup', pathMatch: 'full'}
    ],
    
  },
  {path:"employee",component:EmployeeComponent},
  {path:"dashboard/:empId",component:EmployeeComponent},
  {path:"admin-home",component:AdminDashboardComponent},
  {path:"employeeSignin", component:SignInComponent2},
  {path:"userOrderStatus", component:OrderStatusComponent},
  {path:"editProfile", component:EditProfileComponent},
  {path:"addFunds", component:FundsComponent},
  //should be set to home or index page
  { path: "home", component: AppComponent },
  { path: '', redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
