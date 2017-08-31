import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute } from "@angular/router";
import { AppUser } from "app/models/app-user";
import { UserService } from "app/user.service";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';


@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private afAuth : AngularFireAuth,
     private route: ActivatedRoute,
     private userService : UserService) {
    this.user$ = afAuth.authState;
   }

  storeReturnUrl(){
     let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
     localStorage.setItem('returnUrl', returnUrl);
  }

  login(email:string, password:string){
   this.storeReturnUrl();
   return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  loginWithGoogle(){
    this.storeReturnUrl();
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()); 
  }

  logOut(){
    this.afAuth.auth.signOut();
  }

  createUser(email: string, password: string){
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  }

  isLoggedIn() : boolean{
    if(this.user$){
      return true;
    }else{
      return false;
    }
  }

  get appUser$() : Observable<AppUser>{
     return this.user$
          .switchMap(user => {
            if(user) return this.userService.get(user.uid)

              return Observable.of(null)
          })
  }
}
