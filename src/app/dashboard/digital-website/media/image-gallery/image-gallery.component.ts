import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {

  uploadedImages = {
    fileName:"",
    size:0,
    type:"",
  };
  uploadImgList=[];

  constructor() { }

  ngOnInit(): void {
  }

  imageProcessing(event){
    console.log(event.target.files)

    for(var i=0;i<event.target.files.length;i++){
      this.uploadedImages = {
        fileName:event.target.files[i].name,
        size:event.target.files[i].size,
        type:event.target.files[i].type,
      };

      this.uploadImgList.push(this.uploadedImages)
    }
  }

  removeFile(index){
    this.uploadImgList.splice(index,1)
  }

}
