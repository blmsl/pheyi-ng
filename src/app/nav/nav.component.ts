import { Component, OnInit } from '@angular/core';
import { AuthMethods, AngularFire, AuthProviders} from 'angularfire2'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private af: AngularFire) { }

  isLoggedIn : boolean;


  ngOnInit() {
     this.af.auth.subscribe(authState=>{
       if(!authState){
         this.isLoggedIn = false;
       }else{
         this.isLoggedIn = true;

       }
     })
  }

  logOff(){
    this.af.auth.logout();
    this.isLoggedIn = false;
  }
}
