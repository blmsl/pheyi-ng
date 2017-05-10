import { Component } from '@angular/core';
import { FirebaseListObservable, AngularFire, FirebaseObjectObservable } from "angularfire2";
import { CartService } from "app/cart.service";
import { FormGroup, FormControl } from "@angular/forms"

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    providers: [CartService]
})

export class CartComponent {

    cartItems: FirebaseListObservable<any[]>;
    cartItemForSum: FirebaseListObservable<any[]>;
    order: FirebaseListObservable<any[]>;

    user: any;
    authState : any;
    order_reference : any;
    sum;
    removingPrice;
    currentTotal;
    subtotal: FirebaseObjectObservable<any>;
    shippingExisit;
    hasShippingAddress;
    hasCompleteAdding;
    noOfItems;
    isLoggedIn: boolean;
    shippingForm : FormGroup;


    constructor(private af: AngularFire, private ct: CartService) {

    }

    ngOnInit() {
        this.hasShippingAddress = false;
        this.hasCompleteAdding = false;

        // this.count = this.ct.getCartCount();

        //get user and update cart if any
        this.af.auth.subscribe(authState => {
            if (authState) {
                this.isLoggedIn = true;
                this.user = authState.uid;
                this.authState = authState;

                this.cartItems = this.af.database.list('/shoppingCart/' + authState.uid);

                //get subtotal
                this.subtotal = this.af.database.object('/shoppingTotal/' + this.user);

                //order
                this.order = this.af.database.list('/orders');
            } else {
                this.isLoggedIn = false;
            }
        })


        //create shipping form
        this.shippingForm = new FormGroup({
          'firstname' : new FormControl(null),
          'lastname' : new FormControl(null),
           'phone' : new FormControl(null),
           'address' : new FormControl(null),
           'country': new FormControl(null),
           'state': new FormControl(null),
           'city': new FormControl(null),
           'zipCode': new FormControl(null)
          //  'email' : new FormControl(this.authState.email)
        })

    }

    removeItemFromCart($key: string) {
        var item;

        //get current price
        this.af.database.object('/shoppingCart/' + this.user + '/' + $key).subscribe(snapshot => {
            item = snapshot;
            this.removingPrice = item.price;
        })

        //get total and subtract current price
       var subtotal_subscription =  this.subtotal.subscribe(snapshot => {
            this.currentTotal = snapshot.total;
            this.sum = this.currentTotal - this.removingPrice;
        })

        //update new total
        if (this.sum === 0) {
            this.subtotal.remove().then(
                () => {
                    subtotal_subscription.unsubscribe();
                     document.location.reload(); //reload page to clear cache

                }
            );

        } else {
            this.subtotal.update({
                total: this.sum
            })
        }

        this.cartItems.remove($key);

        //update cart count
        this.ct.removeCartCount(1);


    }

    checkout() {

        this.hasCompleteAdding = true;

        //add item to order with isPayed=false
        //check if order exists before pushKey
        this.af.database.list('orders', {
          query:{
            orderByChild : 'uid',
            equalTo : this.user
          }
        }).subscribe(x => {
          if(x.length === 0){
            this.order_reference = this.order.push({
                uid: this.user,
                isPayed: false,
                amount: '',
                shippingDetails: {},
                items: {},
            }).key;

          }
        })

        //check if user has shipping address
        this.shippingExisit = this.af.database.object('/shipping/' + this.user);
        this.shippingExisit.subscribe(x => {
            if (x && x.$value) {
              this.checkOutWithShipping();

            } else {

                this.hasShippingAddress = true;
                //this.checkoutWithoutShipping();
            }
        })

        //get order reference

        //post to paystack with order_reference

        //redirect to payment url from paystack promise

        //redirect to callback url with reference as params

    }

    backToCart(){
      this.hasShippingAddress = false;
      this.hasCompleteAdding = false;
    }

    //customer has shipping address
    checkOutWithShipping(){
      alert('checkout and pay')
      console.log('shipping  exists')
    }

    //customer does not have shipping address
    checkoutWithoutShipping(){
      this.af.database.list('/shipping/' + this.user)
      .push(this.shippingForm.value);

      alert('add shipping address Added')

      console.log('shipping does not exists')
    }

}
