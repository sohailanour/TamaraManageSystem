import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { AddcustomerComponent } from './commponents/pages/customers/addcustomer/addcustomer.component';
import { AllcustomersComponent } from './commponents/pages/customers/allcustomers/allcustomers.component';
import { AddorderComponent } from './commponents/pages/orders/addorder/addorder.component';
import { AllordersComponent } from './commponents/pages/orders/allorders/allorders.component';
import { AllproductsComponent } from './commponents/pages/products/allproducts/allproducts.component';
import { RegisterProductComponent } from './commponents/pages/products/register-product/register-product.component';
import { AddnewuserComponent } from './commponents/pages/users/admin/addnewuser/addnewuser.component';
// import { AdminnavComponent } from './commponents/pages/users/admin/adminnav/adminnav.component';
import { EdituserComponent } from './commponents/pages/users/admin/edituser/edituser.component';
import { ManagestaffComponent } from './commponents/pages/users/admin/managestaff/managestaff.component';
import { EditprofileComponent } from './commponents/pages/users/editprofile/editprofile.component';
import { LoginComponent } from './commponents/pages/users/login/login.component';
import { ProfileComponent } from './commponents/pages/users/profile/profile.component';

const routes: Routes = [
  // { path: "", component: LoginComponent,canActivate:[AuthGuard] },
  { path: "login", component: LoginComponent ,canActivate:[AuthGuard]},
  { path: "profile", component: ProfileComponent },
  { path: "activateaccount", component: EditprofileComponent },
  { path: "editprofile", component: EditprofileComponent },
  {
    path: "staff", children: [
      { path: "", component: ManagestaffComponent },
      { path: "addnewuser", component: AddnewuserComponent },
      { path: "edituser/:id", component:EdituserComponent },
    ]
  },
  {
    path: "products", children: [
      { path: "", component: AllproductsComponent },
      { path: "registerproduct", component: RegisterProductComponent },
      { path: "editproduct", component: RegisterProductComponent },
    ]
  },
  {
    path: "customers", children: [
      { path: "", component: AllcustomersComponent },
      { path: "registercustomer", component: AddcustomerComponent },
      // { path: "editproduct", component: RegisterProductComponent },
    ]
  },
  {
    path: "orders", children: [
      { path: "", component: AllordersComponent },
      { path: "registerorder", component: AddorderComponent },
      // { path: "editproduct", component: RegisterProductComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// {
//     path:"providers", children:[
//       {path:":slug", component:ProvidersComponent},
//       {path:":slug/:singleSlug", component:SingleproviderComponent}
//     ]
//   }