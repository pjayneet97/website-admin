import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  email;
  password;
  error;
  isCreated = false;
  existdomain;
  
  

  constructor( private authService: AuthService ) { }

  ngOnInit(): void {
  }

  signup(formData:NgForm) {
    let cred={email:formData.value.email,password:formData.value.password}
    let profileInfo={domainName:formData.value.domainName}

    this.authService.createAccount(cred,profileInfo)
  }

  OnlyText(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 66 || charCode > 90) && (charCode < 97 || charCode > 122)) {
      return false;
    }
    return true;
  }

  isExist(event){
   if (this.authService.getDomains().includes(event)){
    return true
   }else{
    return false
   }
  }

}