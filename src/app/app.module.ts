import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { CustomerComponent } from './components/customer/customer.component';
import { UserComponent } from './components/admin/user/user.component';
import { UserAddComponent } from './components/admin/user/user-add/user-add.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ApiService } from '../app/components/service/api.service';
import { AuthGuard } from '../app/components/service/auth.guard';
import { MyInterceptor } from '../app/components/service/my-interceptor';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    CustomerComponent,
    UserComponent,
    UserAddComponent,
    PageNotFoundComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ApiService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: MyInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
