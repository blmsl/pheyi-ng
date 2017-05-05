import { Injectable, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2";

@Injectable()
export class CartService implements OnInit {
    ngOnInit(): void {
      throw new Error('Method not implemented.');
    }

    cartItems: FirebaseObjectObservable<any>;
    user: string;
    count : number;

  constructor(private af : AngularFire) {
     this.af.auth.subscribe(authState => {
            if(authState){

              this.user = authState.uid;

              this.cartItems =  this.af.database.object('/shoppingCart/'+authState.uid);  
              this.cartItems.subscribe(x=>{
                this.count = x.length
              })       
           }
        })

  }
  getCartCount(){
    return this.count;
  }

  addCartCount($count : number){
    this.count = this.count + $count;
  }

  removeCartCount($count : number){
    this.count = this.count - $count;
  }

  getCartItems(){
     return this.cartItems;
  }

}
