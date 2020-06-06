import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Capacitor } from '@capacitor/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';
declare var RazorpayCheckout:any;
@Component({
  selector: 'app-extend-validity',
  templateUrl: './extend-validity.component.html',
  styleUrls: ['./extend-validity.component.scss']
})
export class ExtendValidityComponent implements OnInit {
  years=1
  WindowRef
  constructor(public auth:AuthService,public https:HttpClient,public common:CommonService,public router:Router) { 
    this.WindowRef=window
  }

  ngOnInit(): void {
  }

  proceedToPay(event){

    this.common.showLoader()
    if(Capacitor.getPlatform()=="web"){
      this.initiatePaymentModal(event);
    }
    else{
      this.initiatePaymentApp(event);
    }
  }

  initiatePaymentModal(event) {
    this.preparePaymentDetails().then(res=>{
      var rzp1 = new this.WindowRef.Razorpay(res);
      this.common.stopLoader()
      rzp1.open(); 
      event.preventDefault();
    })
  }

  handle_response(_response){
    this.auth.extendValidity(this.years,_response).then(res=>{
      this.common.showToast("success","Validity Extended Successfully","")
      this.router.navigateByUrl("/dashboard")
    })
  }

  async initiatePaymentApp(event){
    var successCallback = function(_response) {
     this.handle_response(_response)
    }
    
    var cancelCallback = function(error) {
      alert(error.description + ' (Error '+error.code+')')
    }
    
    RazorpayCheckout.on('payment.success', successCallback)
    RazorpayCheckout.on('payment.cancel', cancelCallback)
    this.preparePaymentDetails().then(res=>{
      this.common.stopLoader()
      RazorpayCheckout.open(res)
    })
   
   }

   preparePaymentDetails(){
    let amount = this.years*499*100
    let orderId
    return this.getOrderId(amount).then((res:any)=>{
      orderId=res.id
      console.log(orderId)
      return  {
        "key": "rzp_test_IpmvnhJLosPYGm", // Enter the Key ID generated from the Dashboard
        "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "RR Portal",
        "description": "Your Property will be added for 6 months",
        "image": "https://example.com/your_logo",
        "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response){
            this.handle_response(response.razorpay_payment_id);
        }.bind(this),
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#FF9F05"
        }
       };
    })
    
   }

   async getOrderId(amount){
    return new Promise(async (resolve)=>{
      await this.https.post('https://us-central1-auth-25323.cloudfunctions.net/createOrder' , {'amount':amount}).subscribe(
        (data:any) => {
            resolve(data);
     })
    })
  }

}
