import { Component } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2'
import {FormGroup, FormControl, Validators} from '@angular/forms'

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

  constructor(private af: AngularFire){

    this.registerForm = new FormGroup({

      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'confirmPassword': new FormControl(null, [Validators.required])

    });
  }

  ngOnInit(){
    this.isRegisterError = false;
    this.registerState = 'Sign up';

    this.af.auth.subscribe(authState => {
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



         this.af.auth.createUser(
          {
            email: registerModel.email,
            password : registerModel.password

          }).then(e =>{
              this.registerState = 'Sign up'
              alert('you have been successfully registered')

          }).catch(error => {
            this.registerState = 'Sign up'
            this.isRegisterError = true;
            this.registerErrorMessage = error.message;
          });
       }




}
