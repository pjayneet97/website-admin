import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DigitalWebsiteComponent } from './dashboard/digital-website/digital-website.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ContactInforamtionsComponent } from './dashboard/digital-website/contact-inforamtions/contact-inforamtions.component';
import { AboutUsComponent } from './dashboard/digital-website/about-us/about-us.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PaymentsComponent } from './dashboard/digital-website/payments/payments.component';
import { HeaderComponent } from './header/header.component';
import { SocialMediaComponent } from './dashboard/digital-website/social-media/social-media.component';
import { ShowWebsiteTemplateComponent } from './dashboard/digital-website/show-website-template/show-website-template.component';

import { MediaComponent } from './dashboard/digital-website/media/media.component';
import { ImageGalleryComponent } from './dashboard/digital-website/media/image-gallery/image-gallery.component';
import { VideoGalleryComponent } from './dashboard/digital-website/media/video-gallery/video-gallery.component';
import { HelpCenterComponent } from './dashboard/help-center/help-center.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SigninComponent,
    SignupComponent,
    ForgetPasswordComponent,
    DashboardComponent,
    DigitalWebsiteComponent,
    HomeComponent,
    ContactInforamtionsComponent,
    AboutUsComponent,
    PaymentsComponent,
    HeaderComponent,
    SocialMediaComponent,
    ShowWebsiteTemplateComponent,
    MediaComponent,
    ImageGalleryComponent,
    VideoGalleryComponent,
    HelpCenterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    CKEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
