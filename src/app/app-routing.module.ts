import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './components/service/auth/auth.guard';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
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
    data: { title: 'Product Details' }
  },
  {
    path: 'admin/dashboard',
    component: AdminComponent,
    data: { title: 'Admin Dashboard' }
    // canActivate:[AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent }
  // {
  //   path: 'product-edit/:id',
  //   component: ProductEditComponent,
  //   data: { title: 'Edit Product' }
  // },
  // { path: '',
  //   redirectTo: '/products',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
