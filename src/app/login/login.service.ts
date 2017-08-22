import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database'
import { AngularFireAuth } from "angularfire2/auth";


export class LoginService{
   constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth ){ }

   login(loginModel){
    //  this.afAuth.auth..login({
    //    provider:AuthProviders.Password,

    //  })
   }

   logoutOut(){

   }

   register(registerModel){
      // var promise =  this.afAuth.auth.createUser({
      //    email : registerModel.email,
      //    password: registerModel.password
      //  }).then(x=>{
      //    console.log('User registered')
      //  })

   }

}
