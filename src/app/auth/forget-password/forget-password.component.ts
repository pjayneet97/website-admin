import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }
  resetPassword(formData:NgForm){
    this.authService.resetPassword(formData.value.email)
  }


}