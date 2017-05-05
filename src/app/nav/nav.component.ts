import { Component, OnInit } from '@angular/core';
import { AuthMethods, AngularFire, AuthProviders, FirebaseListObservable } from 'angularfire2'
import { CartService } from "app/cart.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers : [CartService]
})
export class NavComponent implements OnInit {
    count: number;
    cartItems: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire, private ct : CartService) { 
    
  }

  isLoggedIn : boolean;
  isAdmin : boolean;


  ngOnInit() {
    this.af.auth.subscribe(authState=>{
       if(!authState){
         this.isLoggedIn = false;
       }else{
         this.isLoggedIn = true;
         if(authState.auth.email === 'daniel.adigun@digitalforte.ng'){
           this.isAdmin = true;
         }else{
           this.isAdmin = false;
         }

       }
       //get no of items in cart
      // this.count = this.ct.getCartCount();
      this.af.database.list('/shoppingCart/'+authState.uid).subscribe(x=>{
         this.count = x.length;
      })
     })
  }

  logOff(){
    this.af.auth.logout();
    this.isLoggedIn = false;
    window.location.href = document.location.origin + '/'; 
  }
}
