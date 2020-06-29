import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  
  title = 'project-starter';

  constructor(private auth: AuthService, private router:Router) {}

  ngOnInit(): void { 
    if(this.auth.isAuthenticated){
      this.router.navigateByUrl('/dashboard');
    }else{
      this.router.navigateByUrl('/auth');
    }
  }

}
