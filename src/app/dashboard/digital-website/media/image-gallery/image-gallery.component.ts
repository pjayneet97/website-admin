import { Component, OnInit } from '@angular/core';
import { DigitalWebsiteService } from 'src/app/services/digital-website.service';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {

  uploadedImages = {
    fileName: "",
    size: 0,
    type: "",
  };
  uploadImgList = [];

  constructor(
    public digitalService:DigitalWebsiteService
    ) { }

  ngOnInit(): void {
  }

  imageProcessing(event) {
    console.log(event.target.files)
    // let path = userid/gallery/docid
    
    for (var i = 0; i < event.target.files.length; i++) {
      this.uploadedImages = {
        fileName: event.target.files[i].name,
        size: event.target.files[i].size,
        type: event.target.files[i].type,
        
      };
      
      // event.target.files.forEach(element => {
      //   this.uploadedImages = {
      //     fileName: element.name,
      //     size: element.size,
      //     type: element.type,
      //   };
      // });
      

      this.uploadImgList.push(this.uploadedImages)
    }
  }

  uploadNow(){
    // this.storage.upload("imag.com", this.uploadImgList).then(res => {
    //   console.log(res)
    // })
    console.log("Upload is not working now")
    this.digitalService.uploadGalleryImg(this.uploadedImages)
  }

  removeFile(index) {
    this.uploadImgList.splice(index, 1)
  }

}
