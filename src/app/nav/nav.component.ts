import { Component, OnInit } from '@angular/core';
import { AuthMethods, AngularFire, AuthProviders, FirebaseListObservable } from 'angularfire2'
import { CartService } from "app/cart/shared/cart.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
    count: number;
    cartItems: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire, private cartSvc : CartService) { 
    
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
      this.cartSvc.getCartItemsList(authState.uid).subscribe((cartItems) =>{
          this.count = cartItems.length;
      })

     })
  }

  logOff(){
    this.af.auth.logout().then(e=>{
      this.isLoggedIn = false;
      window.location.href = document.location.origin + '/'; 
    });
    
  }
}
