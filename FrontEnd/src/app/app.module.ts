import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterProductComponent } from './commponents/pages/products/register-product/register-product.component';
import { NavbarComponent } from './commponents/shared/navbar/navbar.component';
import { AllproductsComponent } from './commponents/pages/products/allproducts/allproducts.component';
import { LoginComponent } from './commponents/pages/users/login/login.component';
import { ProfileComponent } from './commponents/pages/users/profile/profile.component';
import { UserInterceptor } from './provides/user.interceptor';
import { AdminnavComponent } from './commponents/pages/users/admin/adminnav/adminnav.component';
import { ManagestaffComponent } from './commponents/pages/users/admin/managestaff/managestaff.component';
import { AddnewuserComponent } from './commponents/pages/users/admin/addnewuser/addnewuser.component';
import { EdituserComponent } from './commponents/pages/users/admin/edituser/edituser.component';
import { EditprofileComponent } from './commponents/pages/users/editprofile/editprofile.component';
import { AllcustomersComponent } from './commponents/pages/customers/allcustomers/allcustomers.component';
import {AddcustomerComponent} from './commponents/pages/customers/addcustomer/addcustomer.component'
import { AllordersComponent } from './commponents/pages/orders/allorders/allorders.component';
import { AddorderComponent } from './commponents/pages/orders/addorder/addorder.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterProductComponent,
    NavbarComponent,
    AllproductsComponent,
    LoginComponent,
    ProfileComponent,
    AdminnavComponent,
    ManagestaffComponent,
    AddnewuserComponent,
    EdituserComponent,
    EditprofileComponent,
    AllcustomersComponent,
    AddcustomerComponent,
    AllordersComponent,
    AddorderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
