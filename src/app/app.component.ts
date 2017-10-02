import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/auth.service";
import { Router } from "@angular/router";
import { UserService } from "app/user.service";
import { Title }     from '@angular/platform-browser';
// import { MessagingService } from './messaging.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  constructor(private auth: AuthService,  router: Router, private userService : UserService){
    
    this.auth.user$.subscribe(user => {
      if(!user) return;

      userService.save(user);

      let returnUrl = localStorage.getItem('returnUrl');
      if(!returnUrl) return ;
      
      localStorage.removeItem('returnUrl')
      router.navigateByUrl(returnUrl);      
        
      
    })
  }
}
