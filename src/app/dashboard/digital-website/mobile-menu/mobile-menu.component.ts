import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {

  cardDetails=null
  
  constructor(private authService:AuthService,public common:CommonService) { }
  
  email=this.authService.getEmail();

  ngOnInit(): void {
    this.common.showLoader()
    this.authService.getProfile().subscribe(res=>{
      this.cardDetails=res
      this.common.stopLoader()
    })
  }

  logout(){
    this.authService.logOut()
  }

}
