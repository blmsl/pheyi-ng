import { Component } from '@angular/core';
import { AngularFireDatabase} from 'angularfire2/database'
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { AngularFireAuth } from "angularfire2/auth";

@Component({
    templateUrl : './register.component.html',
    styleUrls:['./register.component.css']
})

export class RegisterComponent {
  registerForm : FormGroup;
  isRegisterError : boolean;
  registerErrorMessage : string;
  registerState: string;
  formIsDisabled : boolean;

  constructor(private db: AngularFireDatabase, private afAuth : AngularFireAuth){

    this.registerForm = new FormGroup({

      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'confirmPassword': new FormControl(null, [Validators.required])

    });
  }

  ngOnInit(){
    this.isRegisterError = false;
    this.registerState = 'Sign up';

    this.afAuth.authState.subscribe(authState => {
      if(!authState){
        //not logged in
      }else{
        //logged in
      }
    })
  }


    register(){

      this.registerState = 'please wait..'
      const registerModel = this.registerForm.value;



         this.afAuth.auth.createUserWithEmailAndPassword(
             registerModel.email,
             registerModel.password

          ).then(e =>{
              this.registerState = 'Sign up'
              alert('you have been successfully registered')

          }).catch(error => {
            this.registerState = 'Sign up'
            this.isRegisterError = true;
            this.registerErrorMessage = error.message;
          });
       }




}
