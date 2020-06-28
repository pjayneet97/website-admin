import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { NgForm } from '@angular/forms';
import { DigitalWebsiteService } from 'src/app/services/digital-website.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  public Editor = ClassicEditor;

  aboutData:any={title:""}
  aboutContent:any;
  allWebSiteData:any;
  

  constructor(
    private webService:DigitalWebsiteService
  ) { }

  ngOnInit() {
    this.webService.getWebsiteData().subscribe(res=>{
      if(res){
        // console.log(res)
        this.allWebSiteData=res
        // console.log(this.allWebSiteData.socialMedia)
        if (this.allWebSiteData.aboutUs){
          // console.log("True")
          this.aboutData = this.allWebSiteData.aboutUs;
        }
        else{
          // console.log("False")
        }
      }
    })
  }

  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.aboutContent = data;        
  }

  saveAboutUs(form:NgForm){
    let aboutUs = {
      title:form.value.title,
      description:this.aboutContent
    }
    this.webService.aboutUs(aboutUs)
  }



}
