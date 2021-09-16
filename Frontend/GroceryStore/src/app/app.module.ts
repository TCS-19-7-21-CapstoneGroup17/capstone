import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { ShoppingCartComponent } from './customer/shopping-cart/shopping-cart.component';
import { AddGroceriesComponent } from './customer/add-groceries/add-groceries.component';
import { CustomerComponent } from './customer/customer.component';
import { RaiseTicketComponent } from './customer/raise-ticket/raise-ticket.component';
import { SignUpComponent } from './customer/sign-up/sign-up.component';
import { SignInComponent } from './customer/sign-in/sign-in.component';

import { EmployeeComponent } from './employee/employee.component';
import { SendRequestComponent } from './employee/send-request/send-request.component';
import { UpdateOrderStatusComponent } from './employee/update-order-status/update-order-status.component';
import { UnlockUsersComponent } from './employee/unlock-users/unlock-users.component';
import { EditEmployeeProfileComponent } from './employee/edit-employee-profile/edit-employee-profile.component';
import { PendingOrdersComponent } from './employee/update-order-status/pending-orders/pending-orders.component';
import { ShippedOrdersComponent } from './employee/update-order-status/shipped-orders/shipped-orders.component';
import { DeliveredOrdersComponent } from './employee/update-order-status/delivered-orders/delivered-orders.component';
import { CancelledOrdersComponent } from './employee/update-order-status/cancelled-orders/cancelled-orders.component';
import { OutForDeliveryOrdersComponent } from './employee/update-order-status/out-for-delivery-orders/out-for-delivery-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    AddGroceriesComponent,
    CustomerComponent,
    RaiseTicketComponent,
    SignUpComponent,
    SignInComponent,
    EmployeeComponent,
    SendRequestComponent,
    UpdateOrderStatusComponent,
    UnlockUsersComponent,
    EditEmployeeProfileComponent,
    PendingOrdersComponent,
    ShippedOrdersComponent,
    DeliveredOrdersComponent,
    CancelledOrdersComponent,
    OutForDeliveryOrdersComponent,
    ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
