import { Component } from '@angular/core';
import { FirebaseListObservable, AngularFire } from "angularfire2";

@Component({
   selector : 'app-cart',
    templateUrl : './cart.component.html'
})

export class CartComponent{

    cartItems : FirebaseListObservable<any[]>;
    user : any;

    constructor(private af : AngularFire){
         //get user and update cart if any
        this.af.auth.subscribe(authState => {
            if(authState){
              this.cartItems =  this.af.database.list('/shoppingCart/'+authState.uid);
            }
        })
    }

    ngOnInit(){
       this.getTotal();

    }

    getTotal(){
        console.log(this.cartItems)
    }

}
