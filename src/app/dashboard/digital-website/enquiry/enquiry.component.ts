import { Component, OnInit } from '@angular/core';
import { DigitalWebsiteService } from 'src/app/services/digital-website.service';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss']
})
export class EnquiryComponent implements OnInit {
allEnquiry = []
  constructor(public digitalWebsiteService:DigitalWebsiteService) { }

  ngOnInit(): void {
    this.digitalWebsiteService.getAllEnquiry().subscribe(enquiries=>{
      this.allEnquiry = enquiries
      console.log(this.allEnquiry)
    })
  }

}
