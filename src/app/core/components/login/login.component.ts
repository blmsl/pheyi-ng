import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,  FirebaseListObservable } from 'angularfire2/database'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { AuthService } from "app/shared/services/auth.service";


@Component({
    templateUrl : './login.component.html',
    styleUrls:['./login.component.css'],
})


export class LoginComponent implements OnInit{
  constructor(
    private db : AngularFireDatabase, 
    private router : Router,
    private auth : AuthService,
    private afAuth: AngularFireAuth){ }

  //control group object for login
  loginForm : FormGroup;
  registerForm: FormGroup;
  loginState : string;
  loggedInStatus : string;
  loginError : boolean;
  loginErrorMessage : string;
  isLoggedIn : boolean;

  ngOnInit(){

    //scroll to top on activation
    window.scrollTo(0,0);

    this.loginState = 'login'; this.loginError = false;

      // if(this.auth.isLoggedIn){

      //   this.isLoggedIn = false;
      // }else{
      //   this.loggedInStatus = 'please wait....';
      // }

    this.loginForm = new FormGroup({
      'username' : new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'rememberMe' : new FormControl(true)
    });

  }

  loginWithGoogle(){
    this.auth.loginWithGoogle();
  }

  login(){
      this.loginState = 'please wait..'
      this.auth.login(this.loginForm.value.username, this.loginForm.value.password)
      .then(authState => {

         this.loginState = 'Login';
         this.router.navigate(['/'])
         console.log("Login Success", authState)

       }).catch(error =>{

         this.loginState = 'Login';
         this.loginErrorMessage = error.message;
         console.log("LOGIN ERROR ", error);

       });
 }


}
