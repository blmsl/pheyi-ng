import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from "app/shopping-cart.service";
import { ShoppingCart } from "app/models/app-shopping-cart";
import { OrderService } from "app/order.service";
import { Observable } from "rxjs/Observable";
import { ShippingService } from "app/shipping.service";
import { Subscription } from "rxjs/Subscription";
import { AuthService } from "app/auth.service";
import { Order } from "app/models/app-order";
import { Router } from "@angular/router";
import { PaymentGatewayService } from "app/payment-gateway.service";
import { ShippingAddress } from "app/ShippingAddress";

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy{ 
  order: Order;
  userShipping: ShippingAddress;

  checkShipping$ : Observable<boolean>;
  cart$: Observable<ShoppingCart>;
  
  userSubscription : Subscription;
  userId : string;
  email : string;
  cart : ShoppingCart;
  showChangeAddress : boolean = false;
  
 
  constructor(
    private shippingService : ShippingService,
    private authService : AuthService,
    private orderService : OrderService,
    private router : Router,
    private shoppingCartService : ShoppingCartService,
    private paymentService : PaymentGatewayService){ }
  
  async ngOnInit(){
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.userId = user.uid;
      this.email = user.email;

      this.shippingService.getSingle(this.userId).subscribe(shipping => this.userShipping = shipping);
   }); 

   this.cart$ =  await this.shoppingCartService.getCart();
   this.checkShipping$ = await this.shippingService.checkShipping(this.userId);
  }
  
  ngOnDestroy(){
    this.userSubscription.unsubscribe();    
  }

  async placeOrder() {

    this.cart$.subscribe(cart => {
      this.cart = cart;
      this.order = new Order(this.userId, this.userShipping, cart)
    });

    let result = await this.orderService.placeOrder(this.order, this.userShipping);
    this.paymentService.payWithPaystack(this.cart.totalPrice, result.key, this.email)
        .subscribe(response => {
          // this.shoppingCartService.clearCart();
          window.location.href = (response.json().data.authorization_url); 
        }, error =>{
           alert(JSON.parse(error._body).message);
        });
        
    
  } 
 
  changeAddress(){
    this.showChangeAddress = true;
  }

  cancelChangeAddress(){
    this.showChangeAddress = false;    
  }
  
 
}
