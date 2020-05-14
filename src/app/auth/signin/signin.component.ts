import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {

  email;
  password;
  error;
  isLogedIn = false;

  constructor( private authService: AuthService ) { }

  ngOnInit(): void { }

  signin(formData:NgForm) {
    this.authService.signIn(formData.value.email,formData.value.password);
  }

}