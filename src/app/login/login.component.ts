import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service'
import { AngularFireDatabase,  FirebaseListObservable } from 'angularfire2/database'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';


@Component({
    templateUrl : './login.component.html',
    styleUrls:['./login.component.css'],
    //  providers:[LoginService]
})


export class LoginComponent implements OnInit{
  constructor(private db : AngularFireDatabase, private router : Router, private afAuth: AngularFireAuth){ }

  //control group object for login
  loginForm : FormGroup;
  registerForm: FormGroup;
  loginState : string;
  loggedInStatus : string;
  loginError : boolean;
  loginErrorMessage : string;
  isLoggedIn : boolean;

  ngOnInit(){
    // this.loginForm = new FormGroup();
    this.loginState = 'login'; this.loginError = false;

    this.afAuth.authState.subscribe(authState => {
      if(!authState){
        this.loggedInStatus = 'You are not logged in';
        this.isLoggedIn = false;
      }else{
        this.loggedInStatus ='you are currently logged in';
        this.isLoggedIn = true;
      }
    })

    this.loginForm = new FormGroup({
      'username' : new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'rememberMe' : new FormControl(true)
    });

  }

  loginWithGoogle(){
    
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    .then(authState=>{
      window.location.href = document.location.origin + '/';
      console.log('Logged in via Google');
    })
  }

  login(){
    // console.log(this.loginForm.value);
       this.loginState = 'please wait..'
   
      this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.username, this.loginForm.value.password)
      .then(authState => {

         this.loginState = 'Login';
         window.location.href = document.location.origin + '/'; 
         console.log("Login Success", authState)

       }).catch(error =>{

         this.loginState = 'Login';
         this.loginErrorMessage = error.message;
         console.log("LOGIN ERROR ", error);

       });
 }


}
