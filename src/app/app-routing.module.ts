import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../app/services/auth-guard.service';
import { CommonService } from 'src/app/services/common.service';

import { AuthComponent } from '../app/auth/auth.component';
import { SigninComponent } from '../app/auth/signin/signin.component';
import { SignupComponent} from '../app/auth/signup/signup.component';
import { ForgetPasswordComponent} from '../app/auth/forget-password/forget-password.component';
import { DashboardComponent } from '../app/dashboard/dashboard.component';


const routes: Routes = [
  {path:"auth",component:AuthComponent,children:[
    {path:"",component:SigninComponent},
    {path:"signup",component:SignupComponent},
    {path:"forget-password",component:ForgetPasswordComponent}
  ]},
  {path:"dashboard",component:DashboardComponent,canActivate:[AuthGuardService],children:[
    {path:"",component:DashboardComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
