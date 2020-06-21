import { Component, OnInit } from '@angular/core';
import { DigitalWebsiteService } from 'src/app/services/digital-website.service';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {

  gallery=[]

  constructor(
    public digitalService:DigitalWebsiteService
    ) { }

  ngOnInit(): void {
    this.digitalService.getGallery().subscribe(res=>{
      this.gallery=res
      console.log(this.gallery)
    })
  }

  imageProcessing(event) {
    // let path = userid/gallery/docid
    
    for (var i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i]
      this.digitalService.uploadGalleryImg(file)
      };

    }

  removeFile(id) {
    this.digitalService.delGalleryImage(id)
  }

}
