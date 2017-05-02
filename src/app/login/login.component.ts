import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service'
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2'
import { FormGroup, FormControl, Validators } from '@angular/forms'


@Component({
    templateUrl : './login.component.html',
    styleUrls:['./login.component.css'],
    //  providers:[LoginService]
})


export class LoginComponent implements OnInit{
  constructor(private af : AngularFire){ }

  //control group object for login
  loginForm : FormGroup;
  loginState : string;
  loginError : boolean;
  loginErrorMessage : string;

  ngOnInit(){
    // this.loginForm = new FormGroup();
    this.loginState = 'login'; this.loginError = false;
    this.loginForm = new FormGroup({
      'username' : new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'rememberMe' : new FormControl(true)
    });
  }

  loginWithGoogle(){
    this.af.auth.login({
      provider : AuthProviders.Google,
      method: AuthMethods.Popup
    }).then(authState=>{
      console.log('Logged in via Google');
    })
  }

  login(){
    // console.log(this.loginForm.value);
       this.loginState = 'please wait..'
       this.af.auth.login({
         email : this.loginForm.value.username,
         password: this.loginForm.value.password
       }, {
         method: AuthMethods.Password,
         provider: AuthProviders.Password
       }).then(authState => {
         this.loginState = 'Login';
         alert('you are logged in')
         console.log("Login Success", authState)
       }).catch(error =>{
         this.loginState = 'Login';
         this.loginErrorMessage = error.message;
         console.log("LOGIN ERROR ", error);
       });
 }

  register(){
    // this.af.auth.createUser({email: this.username, password : this.password});
  }

  logOff(){
    this.af.auth.logout();
  }

}
