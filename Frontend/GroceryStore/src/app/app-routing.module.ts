import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGroceriesComponent } from './customer/add-groceries/add-groceries.component';
import { CustomerComponent } from './customer/customer.component';
import { RaiseTicketComponent } from './customer/raise-ticket/raise-ticket.component';
import { ShoppingCartComponent } from './customer/shopping-cart/shopping-cart.component';
import { SignInComponent } from './customer/sign-in/sign-in.component';
import { SignUpComponent } from './customer/sign-up/sign-up.component';

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
      { path: '', redirectTo: 'signup', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
