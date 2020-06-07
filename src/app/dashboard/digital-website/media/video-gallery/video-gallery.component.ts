import { Component, OnInit } from '@angular/core';
import { DigitalWebsiteService } from 'src/app/services/digital-website.service';
import { NgForm } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.scss']
})
export class VideoGalleryComponent implements OnInit {

  uploadVideoList=[]

  constructor(
    public digiService:DigitalWebsiteService,
    public common: CommonService,
  ) { }

  ngOnInit(): void {
    this.digiService.getYouTubeLinks().subscribe(res=>{
      console.log(res)
      this.uploadVideoList=res;
    });
  }

  AddYouTubeLinks(form:NgForm){
    let videoUrl = Object.assign({}, form.value);
    this.digiService.addYouTubeLinks(videoUrl).then(res=>{
      this.common.showToast("success", "Added Successful", "YouTube link added Successfully");
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  }

  removeFile(id){
    this.digiService.deleteYouTubeLink(id);
  }

}
