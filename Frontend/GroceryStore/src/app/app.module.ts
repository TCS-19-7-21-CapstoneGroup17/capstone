import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SendRequestComponent } from './employee/send-request/send-request.component';
import { UpdateOrderStatusComponent } from './employee/update-order-status/update-order-status.component';
import { UnlockUsersComponent } from './employee/unlock-users/unlock-users.component';
import { EditEmployeeProfileComponent } from './employee/edit-employee-profile/edit-employee-profile.component';
import { PendingOrdersComponent } from './employee/update-order-status/pending-orders/pending-orders.component';
import { ShippedOrdersComponent } from './employee/update-order-status/shipped-orders/shipped-orders.component';
import { DeliveredOrdersComponent } from './employee/update-order-status/delivered-orders/delivered-orders.component';
import { CancelledOrdersComponent } from './employee/update-order-status/cancelled-orders/cancelled-orders.component';
import { OutForDeliveryOrdersComponent } from './employee/update-order-status/out-for-delivery-orders/out-for-delivery-orders.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
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
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
