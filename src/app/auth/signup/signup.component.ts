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
  isDomainExist=false
  password;

  constructor( private authService: AuthService ) { }

  ngOnInit(): void {
  }

  signup(formData:NgForm) {
    let cred={email:formData.value.email,password:formData.value.password}
    let profileInfo={domainName:formData.value.domainName}

    this.authService.createAccount(cred,profileInfo)
  }

/*   OnlyText(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 66 || charCode > 90) && (charCode < 97 || charCode > 122)) {
      return false;
    }
    return true;
  } */

  onKey(event){
    console.log(event.target.value)
    if(event.target.value){
      this.authService.isDomainExist(event.target.value).then(res=>{
        console.log(res)
        if(res>0){
          this.isDomainExist=true
        }
        else{
          this.isDomainExist=false
        }
      })
    }
  }

}