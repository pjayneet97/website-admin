import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DigitalWebsiteService } from 'src/app/services/digital-website.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-digital-website',
  templateUrl: './digital-website.component.html',
  styleUrls: ['./digital-website.component.scss']
})
export class DigitalWebsiteComponent implements OnInit {

  constructor(
    private digitalcard: DigitalWebsiteService,
    private auth:AuthService,
    public router: Router,
  ) { }

  allWebSiteData:any;

  socialMedia:any={
    uid: this.auth.getUid(),
    facebook:"www.facebook.com",
    instagram:"www.instagram.com",
    twitter:"www.twitter.com",
    youtube:"www.youtube.com",
    linkedin:"www.linkedin.com",
    tiktok:"www.tiktok.com",
    pinterest:"www.pinterest.com"
  };

  cotactInfo:any;
  

  ngOnInit(): void {
    this.digitalcard.getWebsiteData().subscribe(res=>{
      this.allWebSiteData=res
      // console.log(this.allWebSiteData.socialMedia)
      if (this.allWebSiteData.socialMedia){
        // console.log("True")
        this.socialMedia = this.allWebSiteData.socialMedia;
      }
      else{
        // console.log("False")
        this.digitalcard.updateSocialMediaLinks(this.socialMedia)
      }
    })
  }


  saveSocialMedia(form: NgForm) {
    let data = Object.assign({}, form.value);
    if (form == null){
      this.router.navigateByUrl("/dashboard/digital-website")
    }
    else{
      data['id'] = this.auth.getUid()
      this.digitalcard.updateSocialMediaLinks(data)
    }
    // console.log(form.value == null)
    form.reset()
  }

}
