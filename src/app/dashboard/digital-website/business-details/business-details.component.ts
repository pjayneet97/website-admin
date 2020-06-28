import { Component, OnInit } from '@angular/core';
import { DigitalWebsiteService } from 'src/app/services/digital-website.service';
import { NgForm } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.scss']
})
export class BusinessDetailsComponent implements OnInit {

  imgSrc: string = "https://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder.png";
  selectedImage: any = null;
  isSubmitted: boolean;
  businessData:any
  constructor(
    public digiService: DigitalWebsiteService,
    public common: CommonService,
  ) { }

  ngOnInit(): void {
    this.digiService.getWebsiteData().subscribe(res=>{
      console.log(res)
      this.businessData = res
    })
  }

  onSubmit(form: NgForm) {
    // this.isSubmitted = true;
    var filePath = `${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    console.log(filePath);
    this.digiService.uploadLogoImg(this.selectedImage)
    form.resetForm()
    this.imgSrc = 'https://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder.png';
  }

  imageProcessing(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      console.log(this.selectedImage);
    }
    else {
      this.imgSrc = 'https://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder.png';
      this.selectedImage = null;
      console.log(this.selectedImage);
    }
  }

}
