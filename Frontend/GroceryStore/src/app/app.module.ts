import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ShoppingCartComponent } from './customer/shopping-cart/shopping-cart.component';
import { AddGroceriesComponent } from './customer/add-groceries/add-groceries.component';
import { CustomerComponent } from './customer/customer.component';
import { RaiseTicketComponent } from './customer/raise-ticket/raise-ticket.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './customer/sign-up/sign-up.component';
import { SignInComponent } from './customer/sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    AddGroceriesComponent,
    CustomerComponent,
    RaiseTicketComponent,
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
