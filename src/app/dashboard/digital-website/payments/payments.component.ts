import { Component, OnInit } from '@angular/core';
import { DigitalWebsiteService } from 'src/app/services/digital-website.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {

  constructor(
    public digitalService: DigitalWebsiteService
  ){}

  ngOnInit(): void {
  }

  savePaymentMethod(form: NgForm) {
    let data = Object.assign({}, form.value);
    // console.log(data)

    let paymentsIds = {
      razorPay:data['razorpay'],
      paytm:data['paytm'],
      phonePay:data['phonePay'],
      upi:data['upi'],
      googlePay:data['googlePay'],
    }

    let bankData = {
      acHoldName:data['acHoldName'],
      acNo:data['acNo'],
      ifsc:data['ifsc'],
    }

    if (paymentsIds.razorPay=='' || paymentsIds.paytm=='' || paymentsIds.phonePay=='' || paymentsIds.upi=='' || paymentsIds.googlePay==''){
      alert("All Fileeds Are requied")
    }else{
      console.log(paymentsIds)
      console.log(bankData)
      this.digitalService.paymentMethods(paymentsIds,bankData)
    }
  }


}
