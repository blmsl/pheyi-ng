import { Component } from '@angular/core';
import { FirebaseListObservable, AngularFire, FirebaseObjectObservable } from "angularfire2";
// import { CartService } from "app/cart.service";
import { FormGroup, FormControl } from "@angular/forms";
import { Headers, Http } from "@angular/http";
import { CartService } from "app/cart/shared/cart.service";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
})

export class CartComponent {
    subtotal: number;

    cartItems: FirebaseListObservable<any[]>;
    cartItemForSum: FirebaseListObservable<any[]>;
    order: FirebaseListObservable<any[]>;
    shipping: FirebaseObjectObservable<any>;
  
    user: any;
    email: any;
    authState: any;
    order_reference: string;
    _ref: string;

   
    shippingExisit;
    hasShippingAddress;
    hasCompleteAdding;

    isLoggedIn: boolean;
    shippingForm: FormGroup;


    constructor(private af: AngularFire, private http: Http, private cartSvc: CartService) { }

    ngOnInit() {
        this.subtotal = 0;
        this.hasShippingAddress = false;
        this.hasCompleteAdding = false;

        // this.count = this.ct.getCartCount();

        //get user and update cart if any
        this.af.auth.subscribe(authState => {
            if (authState) {
                this.isLoggedIn = true;

                this.user = authState.uid;
                this.authState = authState;
                this.cartItems = this.cartSvc.getCartItemsList(this.user)

                //get subtotal
                this.cartItems.subscribe((cartItems) => {
                    if (cartItems.length === 0) {
                        this.subtotal = 0;
                    } else {
                        cartItems.forEach((cartItem) => {
                            this.subtotal = this.subtotal + cartItem.price;
                        })
                    }
                });

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

        this.cartSvc.getItem(this.user, $key).subscribe((item) => {
            this.subtotal = this.subtotal - item.price;
            if (isNaN(this.subtotal)) {
                this.subtotal = 0;

               //get subtotal
                this.cartItems.subscribe((cartItems) => {
                    if (cartItems.length === 0) {
                        this.subtotal = 0;
                    } else {
                        this.subtotal = 0;  
                        cartItems.forEach((cartItem) => {
                            this.subtotal = this.subtotal + cartItem.price;
                        })
                    }

                });              
            }
        })

        this.cartSvc.removeItem(this.user, $key);

    }

    checkout() {

        this.hasCompleteAdding = true;

        //add item to order with isPayed=false
        //check if order exists before pushKey
        // var amount_paying;
        // this.subtotal.subscribe(snapshot => { amount_paying = snapshot })

        //get items in cart
        var itemsInCart = {};
        this.cartItems.subscribe(snapshot => {
            itemsInCart = snapshot;
        })

        //check if user has shipping address
        this.shipping.subscribe(snapshot => {


            // console.log('order ref: ' + this.order_reference);

            if (snapshot.$value !== null) {
                //create order
                this.order_reference = this.order.push({
                    uid: this.user,
                    isPayed: false,
                    isShipped: false,
                    amount: this.subtotal,
                    shippingDetails: snapshot,
                    items: itemsInCart,
                }).key.toString();
                this.checkOutWithShipping(this.order_reference);

            } else {

                //TODO: Handle workflow without shipping
                // console.log('shipping dosent exist')
                //create order
                this.order_reference = this.order.push({
                    uid: this.user,
                    isPayed: false,
                    isShipped: false,
                    amount: this.subtotal,
                    // shippingDetails: snapshot,
                    items: itemsInCart,
                }).key.toString();

                this.hasShippingAddress = true;
            }
        })




    }

    backToCart() {
        this.hasShippingAddress = false;
        this.hasCompleteAdding = false;
    }

    //customer has shipping address
    checkOutWithShipping(ref: string) {

        this.payWithPayStack(this.subtotal, ref);
    }

    //customer does not have shipping address
    checkoutWithoutShipping() {

        // this.af.database.object('/orders/'+this.order_reference).set({shippingDetails : this.shippingForm.value})

        this.af.database.object('/shipping/' + this.user)
            .set(this.shippingForm.value)
            .then(() => {
                this.payWithPayStack(this.subtotal, this.order_reference);
            })

    }

    payWithPayStack(amount: number, ref: string) {


        //post to paystack and get paystack redirect url
        let url = `https://api.paystack.co/transaction/initialize`;
        const headers = new Headers({
            'Authorization': 'Bearer sk_test_d5bc45fd1e80406abf8d152f5d3c6ff2efe2bca3'
        });

        //payment body
        var body = {

            reference: ref,
            email: this.authState.auth.email,
            amount: amount * 100,
            callback_url: document.location.origin + '/pay_callback/' + ref + '/',

        };
        console.log('ref at paystack method: ' + this.order_reference);
        this.http.post(url, JSON.stringify(body), { headers: headers }).subscribe(response => {

            console.log('Authorization URL: ' + response.json().data.authorization_url)
            window.location.href = response.json().data.authorization_url;
        }, error => {
            console.log(error);
        })


    }


}
