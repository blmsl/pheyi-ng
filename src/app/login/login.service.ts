import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods} from 'angularfire2'


export class LoginService{
   constructor(private af: AngularFire){ }

   login(loginModel){
     this.af.auth.login({
       provider:AuthProviders.Password,

     })
   }

   logoutOut(){

   }

   register(registerModel){
      var promise =  this.af.auth.createUser({
         email : registerModel.email,
         password: registerModel.password
       }).then(x=>{
         console.log('User registered')
       })

   }

}
