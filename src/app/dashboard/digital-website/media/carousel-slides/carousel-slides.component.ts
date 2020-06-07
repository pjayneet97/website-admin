import { Component, OnInit } from '@angular/core';
import { DigitalWebsiteService } from 'src/app/services/digital-website.service';

@Component({
  selector: 'app-carousel-slides',
  templateUrl: './carousel-slides.component.html',
  styleUrls: ['./carousel-slides.component.scss']
})
export class CarouselSlidesComponent implements OnInit {

  slides=[]

  constructor(
    public digitalService:DigitalWebsiteService
    ) { }

  ngOnInit(): void {
    this.digitalService.getSlides().subscribe(res=>{
      console.log(res)
      this.slides=res
    })
  }


  carouselSlideProcessing(event) {
    console.log(event.target.files)
    // let path = userid/gallery/docid
    
    for (var i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i]
      this.digitalService.uploadSlideImg(file)
      };

    }

  removeFile(id) {
    this.digitalService.delSlidesImage(id)
  }

}
