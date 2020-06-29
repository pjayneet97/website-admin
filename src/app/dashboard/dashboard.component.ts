import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  cardDetails=null
  
  constructor(private authService:AuthService,public common:CommonService) { }
  
  ngOnInit(): void {
    this.common.showLoader()
    this.authService.getProfile().subscribe(res=>{
      this.cardDetails=res
      this.common.stopLoader()
    })
  }

}
 