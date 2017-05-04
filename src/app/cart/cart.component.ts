import { Component } from '@angular/core';
import { FirebaseListObservable, AngularFire } from "angularfire2";

@Component({
   selector : 'app-cart',
    templateUrl : './cart.component.html'
})

export class CartComponent{

    cartItems : FirebaseListObservable<any[]>;
    cartItemForSum : FirebaseListObservable<any[]>;
    user : any;
     sum;

    constructor(private af : AngularFire){
         this.sum = 0;

         //get user and update cart if any
        this.af.auth.subscribe(authState => {
            if(authState){
              this.cartItems =  this.af.database.list('/shoppingCart/'+authState.uid);         
              
            }
        })
    }

    ngOnInit(){
      
    }

   removeItemFromCart($key : string){
       this.cartItems.remove($key);
   }

}
