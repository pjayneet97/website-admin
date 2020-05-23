import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.scss']
})
export class VideoGalleryComponent implements OnInit {

  uploadedVideos = {
    fileName:"",
    size:0,
    type:"",
  };
  uploadVideoList=[];

  constructor() { }

  ngOnInit(): void {
  }

  videoProcessing(event){
    console.log(event.target.files)

    for(var i=0;i<event.target.files.length;i++){
      this.uploadedVideos = {
        fileName:event.target.files[i].name,
        size:event.target.files[i].size,
        type:event.target.files[i].type,
      };

      this.uploadVideoList.push(this.uploadedVideos)
    }
  }

  removeFile(index){
    this.uploadVideoList.splice(index,1)
  }

}
