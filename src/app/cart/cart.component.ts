import { Component } from '@angular/core';
import { FirebaseListObservable, AngularFire, FirebaseObjectObservable } from "angularfire2";

@Component({
   selector : 'app-cart',
    templateUrl : './cart.component.html'
})

export class CartComponent{

    cartItems : FirebaseListObservable<any[]>;
    cartItemForSum : FirebaseListObservable<any[]>;
    user : any;
    sum;
    removingPrice;
    currentTotal;
    subtotal : FirebaseObjectObservable<any>;

    constructor(private af : AngularFire){
    

         //get user and update cart if any
        this.af.auth.subscribe(authState => {
            if(authState){

              this.user = authState.uid;

              this.cartItems =  this.af.database.list('/shoppingCart/'+authState.uid);         
               
               //get subtotal
               this.subtotal = this.af.database.object('/shoppingTotal/'+this.user)
            }
        })

        
    }

    ngOnInit(){
     
    }

   removeItemFromCart($key : string){
       var item;

       //get current price
       this.af.database.object('/shoppingCart/'+this.user+'/'+$key).subscribe(snapshot=>{
            item = snapshot;
            this.removingPrice = item.price;
        })
        
       //get total and subtract current price
        this.subtotal.subscribe(snapshot=>{
            this.currentTotal = snapshot.total;
            this.sum = this.currentTotal - this.removingPrice;
          
        })

        //update new total
       this.subtotal.update({
            total : this.sum
        })

       this.cartItems.remove($key);
   }

}
