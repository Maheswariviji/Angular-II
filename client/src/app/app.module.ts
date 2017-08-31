import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChathomeComponent } from './chathome/chathome.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

import { AuthService } from './service/auth.service';
import { CrudserviceService } from './service/crudservice.service';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChathomeComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule
  ],
  providers: [AuthService,AuthGuard, NotAuthGuard,CrudserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
