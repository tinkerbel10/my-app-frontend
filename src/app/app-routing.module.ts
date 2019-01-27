import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './components/service/auth/auth.guard';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';


import { CustomerComponent } from './components/customer/customer.component';
import { UserComponent } from './components/admin/user/user.component';
import { UserAddComponent } from './components/admin/user/user-add/user-add.component';
//
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Admin Dashboard' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Welcome!' }
  },
  {
    path: 'admin/dashboard',
    component: AdminComponent,
    data: { title: 'Admin Dashboard' }
    // canActivate:[AuthGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: { title: 'Forgot Password' }
  },
  {
    path: 'employee/dashboard',
    component: CustomerComponent,
    data: { title: 'Employee Dashboard' }
  },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
