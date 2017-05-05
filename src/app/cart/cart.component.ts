import { Component } from '@angular/core';
import { FirebaseListObservable, AngularFire, FirebaseObjectObservable } from "angularfire2";
import { CartService } from "app/cart.service";

@Component({
   selector : 'app-cart',
    templateUrl : './cart.component.html',
    providers : [CartService]
})

export class CartComponent{

    cartItems : FirebaseListObservable<any[]>;
    cartItemForSum : FirebaseListObservable<any[]>;
    order : FirebaseListObservable<any[]>;

    user : any;
    sum;
    removingPrice;
    currentTotal;
    subtotal : FirebaseObjectObservable<any>;
    shippingExisit;
    hasShippingAddress;
    hasCompleteAdding;
    noOfItems;
    isLoggedIn : boolean;
    count : number;

    constructor(private af : AngularFire, private ct : CartService){       
        
    }

    ngOnInit(){
     this.hasShippingAddress = false;
     this.hasCompleteAdding = false; 
     this.count = this.ct.getCartCount();
     
     //get user and update cart if any
        this.af.auth.subscribe(authState => {
            if(authState){
              this.isLoggedIn = true;
              this.user = authState.uid;

              this.cartItems =  this.af.database.list('/shoppingCart/'+authState.uid);         
               
               //get subtotal
               this.subtotal = this.af.database.object('/shoppingTotal/'+this.user);

               //order
               this.order = this.af.database.list('/orders');
            }else{
                this.isLoggedIn = false;
            }
        })
   
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

       //update cart count
       this.ct.removeCartCount(1);
   }

   checkout(){

       this.hasShippingAddress = true;
       this.hasCompleteAdding =true;

       //add item to order with isPayed=false
       const pushKey = this.order.push({
           uid: '',
           isPayed : false,
           amount : '',
           shippingDetails :{},           
           items : {},
       }).key;

       //check if user has shipping address
       this.shippingExisit = this.af.database.object('/shipping/'+this.user);
       this.shippingExisit.subscribe(x=>{
           if(x && x.$value){
               console.log('shipping  exists')
           }else{
               console.log('shipping does not exists')
           }
       })

       //get order reference

       //post to paystack with order_reference

       //redirect to payment url from paystack promise

       //redirect to callback url with reference as params
       alert('proceeding to checkout')

   }

}
