import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DigitalWebsiteService } from 'src/app/services/digital-website.service';

@Component({
  selector: 'app-contact-inforamtions',
  templateUrl: './contact-inforamtions.component.html',
  styleUrls: ['./contact-inforamtions.component.css']
})
export class ContactInforamtionsComponent implements OnInit {
  data: any
  constructor(
    private webService: DigitalWebsiteService
  ) { }

  ngOnInit() {
    this.webService.getWebsiteData().subscribe(res => {
      this.data = res
    })
  }

  OnlyDigit(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  contactInforamtions(form: NgForm) {
    let data = Object.assign({}, form.value);

    let personalData = {
      ownerName: data['fullname'],
      phoneNo: data['phoneNo'],
      whatsappNo: data['whatsappNo'],
      email: data['email'],
      shopName: data['shopName']
    }

    let address = {
      area: data['area'],
      state: data['state'],
      country: data['country'],
      city: data['city'],
      zipCode: data['zipCode']
    }

    if (personalData.ownerName == '' || personalData.email == '' || personalData.phoneNo == '' || personalData.whatsappNo == '' || personalData.shopName == '') {
      alert("All Fileeds Are requied")
    } else {
      this.webService.updateContactInfo(address, personalData)
    }

  }

}
