import { Component } from '@angular/core';
import { LoginService } from './login.service'
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2'

@Component({
    templateUrl : './login.component.html',
    styleUrls:['./login.component.css'],
    //  providers:[LoginService]
})


export class LoginComponent {

  username : string; password : string;

  constructor(private af : AngularFire){ }

  loginWithGoogle(){
    this.af.auth.login({
      provider : AuthProviders.Google,
      method: AuthMethods.Popup
    }).then(e=>{
      console.log('Logged in via Google');
    })
  }

  register(){
    this.af.auth.createUser({email: this.username, password : this.password});
  }

  logOff(){
    this.af.auth.logout();
  }

}
