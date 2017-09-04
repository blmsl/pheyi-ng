import { Component } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";
// import { CartService } from "app/cart.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Headers, Http } from "@angular/http";
import { CartService } from "app/cart/shared/cart.service";
import { AngularFireAuth } from "angularfire2/auth";
import { ShippingService } from "app/shipping.service";
import { ShoppingCartService } from "app/shopping-cart.service";

declare var jquery: any;
declare var $: any;

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
})

export class CartComponent {
    isPayingError: boolean;
    subtotal: number;
    paymentError : string;
    countries : any[];

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
    isPaying : boolean = false;

    cart$;


    constructor(private af: AngularFireAuth, 
            private db: AngularFireDatabase,
            private http: Http, 
            private cartSvc: CartService,
            private cartService : ShoppingCartService,
            private shippingSvc : ShippingService) { }

    async ngOnInit() {

        this.cart$ = await this.cartService.getCart();
      

        this.subtotal = 0;
        this.hasShippingAddress = false;
        this.hasCompleteAdding = false;

        // populate countries;
        this.http.get('https://restcountries.eu/rest/v2/all').subscribe(response =>{
            this.countries = response.json();
        })

        //get user and update cart if any
        
        this.af.authState.subscribe(authState => {
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
                this.order = this.db.list('/orders');

                //get shipping 
                this.shipping = this.db.object('/shipping/' + this.user);

            } else {
                this.isLoggedIn = false;
            }
        })


        //create shipping form
        this.shippingForm = new FormGroup({
            'firstname': new FormControl(null, Validators.required),
            'lastname': new FormControl(null, Validators.required),
            'phone': new FormControl(null, Validators.required),
            'address': new FormControl(null, Validators.required),
            'country': new FormControl(null, Validators.required),
            'city': new FormControl(null, Validators.required),
        })

    }

    clearCart(){
        this.cartService.clearCart();   
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

            if (snapshot.$value !== null) {

                /*
                    Handle workflow for customer with an existing shipping address
                */

                //create order
                this.order_reference = this.order.push({
                    uid: this.user,
                    isPayed: false,
                    isShipped: false,
                    amount: this.subtotal,
                    shippingDetails: snapshot,
                    items: itemsInCart,
                }).key.toString();

                //pay
                this.checkOutWithShipping(this.order_reference);

            } else {

                /*
                    Handle workflow for customer without shipping address
                */

                //create order
                this.order_reference = this.order.push({
                    uid: this.user,
                    isPayed: false,
                    isShipped: false,
                    amount: this.subtotal,
                    items: itemsInCart,
                }).key.toString();

                //display shipping address form before payment
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

        this.db.object('/shipping/' + this.af.auth.currentUser.uid)
            .set(this.shippingForm.value)
            .then(() => {
                //notify user of update
                alert('Your shipping details have been successfully saved. please proceed to payment')

                //hidding shipping address form
                 this.hasShippingAddress = false;

                 //proceed to payment
                this.payWithPayStack(this.subtotal, this.order_reference);
            })

    }

    payWithPayStack(amount: number, ref: string) {

        //start busy icon
        this.isPaying = true;

        //post to paystack and get paystack redirect url
        let url = `https://api.paystack.co/transaction/initialize`;
        const headers = new Headers({
            'Authorization': 'Bearer sk_test_d5bc45fd1e80406abf8d152f5d3c6ff2efe2bca3'
        });

        //payment body
        var payload = {

            reference: ref,
            email: this.af.auth.currentUser.email,
            amount: amount * 100,
            callback_url: document.location.origin + '/pay_callback/' + ref + '/',

        };
        console.log('ref at paystack method: ' + this.order_reference);
        this.http.post(url, JSON.stringify(payload), { headers: headers }).subscribe(response => {

            console.log('Authorization URL: ' + response.json().data.authorization_url)            
            window.location.href = response.json().data.authorization_url;
            
        }, error => {
            this.isPaying = false;
            this.isPayingError = true;
            this.paymentError = JSON.parse(error._body).message;
            console.log(error);
        }, () => {

            //clear the cart when  payment is successful
            this.cartSvc.removeAll();
            this.isPaying = false;
        })


    }

    toggleMenu($menu){
       $('a[href=#'+$menu+']').trigger("click");
     }

     backToStore(){
         this.isPayingError = false;
         this.hasCompleteAdding = false;
         this.toggleMenu('cart');
     }
     

}
