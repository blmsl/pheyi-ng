import { Component } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Headers, Http } from "@angular/http";
import { AngularFireAuth } from "angularfire2/auth";
import { ShippingService } from "app/shared/services/shipping.service";
import { ShoppingCartService } from "app/shared/services/shopping-cart.service";
import { CartService } from 'app/shopping/services/cart.service';

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

   
    toggleMenu($menu){
       $('a[href=#'+$menu+']').trigger("click");
     }

     backToStore(){
         this.isPayingError = false;
         this.hasCompleteAdding = false;
         this.toggleMenu('cart');
     }
     

}
