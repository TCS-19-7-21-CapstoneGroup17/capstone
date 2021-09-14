import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { OrderStatusComponent } from './user/order-status/order-status.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { FundsComponent } from './user/funds/funds.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    OrderStatusComponent,
    EditProfileComponent,
    FundsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
