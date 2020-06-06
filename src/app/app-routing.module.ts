import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../app/services/auth-guard.service';
import { CommonService } from 'src/app/services/common.service';

import { AuthComponent } from '../app/auth/auth.component';
import { SigninComponent } from '../app/auth/signin/signin.component';
import { SignupComponent} from '../app/auth/signup/signup.component';
import { ForgetPasswordComponent} from '../app/auth/forget-password/forget-password.component';
import { DashboardComponent } from '../app/dashboard/dashboard.component';
import { HomeComponent } from '../app/dashboard/home/home.component';
import { DigitalWebsiteComponent } from 'src/app/dashboard/digital-website/digital-website.component';
import { AboutUsComponent } from 'src/app/dashboard/digital-website/about-us/about-us.component';
import { ContactInforamtionsComponent } from 'src/app/dashboard/digital-website/contact-inforamtions/contact-inforamtions.component';
import { PaymentsComponent } from 'src/app/dashboard/digital-website/payments/payments.component';
import { SocialMediaComponent } from 'src/app/dashboard/digital-website/social-media/social-media.component';
import { ShowWebsiteTemplateComponent } from './dashboard/digital-website/show-website-template/show-website-template.component';
import { HelpCenterComponent } from './dashboard/help-center/help-center.component';
import { MediaComponent } from './dashboard/digital-website/media/media.component';
import { ImageGalleryComponent } from './dashboard/digital-website/media/image-gallery/image-gallery.component';
import { VideoGalleryComponent } from './dashboard/digital-website/media/video-gallery/video-gallery.component';
import { MyAccountComponent } from './dashboard/digital-website/my-account/my-account.component';
import { ProductsComponent } from './dashboard/digital-website/products/products.component';
import { ServicesComponent } from './dashboard/digital-website/services/services.component';
import { ExtendValidityComponent } from './dashboard/digital-website/extend-validity/extend-validity.component';

const routes: Routes = [
  {path:"auth",component:AuthComponent,children:[
    {path:"",component:SigninComponent},
    {path:"signup",component:SignupComponent},
    {path:"forget-password",component:ForgetPasswordComponent}
  ]},
  {path:"dashboard",component:DashboardComponent,canActivate:[AuthGuardService],children:[
    {path:"",component:HomeComponent},
    {path:"digital-website",component:DigitalWebsiteComponent,children:[
      {path:"social-media",component:SocialMediaComponent},
      {path:"extend-validity",component:ExtendValidityComponent},
      {path:"about-us",component:AboutUsComponent},
      {path:"contact-us",component:ContactInforamtionsComponent},
      {path:"services",component:ServicesComponent},
      {path:"payments",component:PaymentsComponent},
      {path:"my-account",component:MyAccountComponent},
      {path:"my-website",component:ShowWebsiteTemplateComponent},
      {path:"products",component:ProductsComponent},

      {path:"media",component:MediaComponent,children:[
        {path:"",component:MediaComponent},
        {path:"image-gallery",component:ImageGalleryComponent},
        {path:"vedio-gallery",component:VideoGalleryComponent},
      ]},
    ]},
  ]},
  {path:"help",component:HelpCenterComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
