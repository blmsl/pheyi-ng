import { Component } from '@angular/core';
import { FirebaseListObservable, AngularFire, FirebaseObjectObservable } from "angularfire2";
import { CartService } from "app/cart.service";
import { FormGroup, FormControl } from "@angular/forms";
import { Headers, Http } from "@angular/http";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    providers: [CartService]
})

export class CartComponent {

    cartItems: FirebaseListObservable<any[]>;
    cartItemForSum: FirebaseListObservable<any[]>;
    order: FirebaseListObservable<any[]>;
    shipping : FirebaseObjectObservable<any>;
    amount_paying : number;

    user: any;
    email: any;
    authState: any;
    order_reference: any;
    sum;
    removingPrice;
    currentTotal;
    subtotal: FirebaseObjectObservable<any>;
    shippingExisit;
    hasShippingAddress;
    hasCompleteAdding;
    noOfItems;
    isLoggedIn: boolean;
    shippingForm: FormGroup;


    constructor(private af: AngularFire, private ct: CartService, private http: Http) { }

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
                this.subtotal.subscribe(snapshot=>{
                    this.amount_paying = snapshot.total
                })

                //order
                this.order = this.af.database.list('/orders');

                //get shipping 
                this.shipping = this.af.database.object('/shipping/' + this.user);

            } else {
                this.isLoggedIn = false;
            }
        })


        //create shipping form
        this.shippingForm = new FormGroup({
            'firstname': new FormControl(null),
            'lastname': new FormControl(null),
            'phone': new FormControl(null),
            'address': new FormControl(null),
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
        var subtotal_subscription = this.subtotal.subscribe(snapshot => {
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
        // var amount_paying;
        // this.subtotal.subscribe(snapshot => { amount_paying = snapshot })
        
        //get items in cart
        var itemsInCart = {};
        this.cartItems.subscribe(snapshot=>{
            itemsInCart = snapshot;
        })

        //create order
        this.af.database.list('orders', {
            query: {
                orderByChild: 'uid',
                equalTo: this.user
            }
        }).subscribe(x => {
            if (x.length === 0) {
                this.order_reference = this.order.push({
                    uid: this.user,
                    isPayed: false,
                    amount: this.amount_paying,
                    shippingDetails: this.shippingForm.value,
                    items: itemsInCart,
                }).key;

            }
        })

        //check if user has shipping address
        this.shipping.subscribe(snapshot => {
            if (snapshot.$value !== null) {
                this.checkOutWithShipping();

            } else {
                console.log('shipping dosent exist')
                this.hasShippingAddress = true;
            }
        })

    }

    backToCart() {
        this.hasShippingAddress = false;
        this.hasCompleteAdding = false;
    }

    //customer has shipping address
    checkOutWithShipping() {
      
        this.payWithPayStack(this.amount_paying);
    }

    //customer does not have shipping address
    checkoutWithoutShipping() {

        this.af.database.object('/shipping/' + this.user)
            .set(this.shippingForm.value)
            .then(() => {
                this.payWithPayStack(this.amount_paying);
            })

    }

    payWithPayStack(amount : number) {

        
        //post to paystack and get paystack redirect url
        let url = `https://api.paystack.co/transaction/initialize`;
        const headers = new Headers({
            'Authorization': 'Bearer sk_test_d5bc45fd1e80406abf8d152f5d3c6ff2efe2bca3'
        });

        //payment body
        var body = {

            reference: this.order_reference,
            email: this.authState.auth.email,
            amount: amount * 100,
            callback_url: document.location.origin + '/'

        };

        this.http.post(url, JSON.stringify(body), { headers: headers }).subscribe(response => {

            console.log('Authorization URL: ' + response.json().data.authorization_url)
            window.location.href = response.json().data.authorization_url;
        }, error => {
            console.log(error);
        })


    }


}
