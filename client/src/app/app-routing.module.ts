import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ChathomeComponent } from './chathome/chathome.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
   { path: 'login', component: LoginComponent ,canActivate: [NotAuthGuard] },
   { path: 'chat', component: ChathomeComponent ,canActivate: [AuthGuard] },
   { path:'register', component:RegisterComponent,canActivate: [NotAuthGuard] },
    { path:'dashboard', component:DashboardComponent,canActivate: [AuthGuard] }

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports:[RouterModule]
})

export class AppRoutingModule { }
